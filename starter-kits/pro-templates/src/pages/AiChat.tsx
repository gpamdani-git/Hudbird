import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, LogIn, X } from "lucide-react";
import "../components/ai-chat/ai-chat.css";
import type {
  AppView,
  ComposerMode,
  ModalKey,
  ModelOption,
  Project,
} from "../components/ai-chat/types";
import { MODELS, SEED_PROJECTS } from "../components/ai-chat/data";
import { useChatEngine } from "../components/ai-chat/useChatEngine";
import { Sidebar } from "../components/ai-chat/Sidebar";
import { Topbar } from "../components/ai-chat/Topbar";
import { Composer } from "../components/ai-chat/Composer";
import { Thread } from "../components/ai-chat/Thread";
import { CanvasPanel } from "../components/ai-chat/CanvasPanel";
import { VoiceMode } from "../components/ai-chat/VoiceMode";
import { AuthScreen } from "../components/ai-chat/AuthScreen";
import {
  NewProjectModal,
  PlansModal,
  SearchModal,
  SettingsModal,
  ShareModal,
  WorkModal,
} from "../components/ai-chat/Modals";
import {
  Greeting,
  ImagesView,
  LibraryView,
  ProjectHeader,
  ProjectsView,
  Suggestions,
} from "../components/ai-chat/Views";
import { softSpring, spring } from "../components/ai-chat/primitives";

type Screen = { name: "app" } | { name: "auth"; mode: "login" | "signup" };
interface Toast {
  id: number;
  text: string;
}

/**
 * Hudbird AI — a complete AI chat web-app template.
 * Guest chat → auth → signed-in workspace with thinking, streaming, canvas,
 * image generation, voice mode, projects, library and history.
 */
export function AiChat() {
  const engine = useChatEngine();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isGuest, setGuest] = useState(true);
  const [plan, setPlan] = useState("free");
  const [screen, setScreen] = useState<Screen>({ name: "app" });
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [view, setView] = useState<AppView>("chat");
  const [projects, setProjects] = useState<Project[]>(SEED_PROJECTS);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalKey>(null);
  const [mode, setMode] = useState<ComposerMode>("chat");
  const [think, setThink] = useState(false);
  const [model, setModel] = useState<ModelOption>(MODELS[0]);
  const [temporary, setTemporary] = useState(false);
  const [voice, setVoice] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [guestSends, setGuestSends] = useState(0);
  const [nudgeDismissed, setNudgeDismissed] = useState(false);
  const [atBottom, setAtBottom] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Hudbird AI — Chat";
  }, []);

  const toast = useCallback((text: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-2), { id, text }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  }, []);

  const messages = engine.active?.messages ?? [];
  const hasMessages = messages.length > 0;
  const project = projects.find((p) => p.id === projectId) ?? null;

  /* ---------- Auto-scroll while streaming ---------- */
  useEffect(() => {
    const el = scrollRef.current;
    if (el && atBottom) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, atBottom]);

  /* ---------- Shortcuts ---------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k" && !isGuest) {
        e.preventDefault();
        setModal("search");
      }
      if (mod && e.shiftKey && e.key.toLowerCase() === "o") {
        e.preventDefault();
        newChat();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  /* ---------- Navigation helpers ---------- */
  const closeMobile = () => setMobileOpen(false);
  const newChat = () => {
    engine.newChat();
    setView("chat");
    setProjectId(null);
    setMode("chat");
    closeMobile();
  };
  const selectChat = (id: string) => {
    engine.selectChat(id);
    const conv = engine.conversations.find((c) => c.id === id);
    setProjectId(conv?.projectId ?? null);
    setView("chat");
    closeMobile();
  };
  const openProject = (id: string) => {
    engine.newChat();
    setProjectId(id);
    setView("project");
    closeMobile();
  };
  const goView = (v: AppView) => {
    setView(v);
    closeMobile();
  };

  const send = (
    text: string,
    opts: { mode: ComposerMode; think: boolean; attachments?: { name: string; size: string }[] }
  ) => {
    if (isGuest) setGuestSends((n) => n + 1);
    engine.send(text, {
      ...opts,
      projectId: view === "project" ? (projectId ?? undefined) : undefined,
    });
    if (view === "project") setView("chat");
    if (opts.mode !== "write") setMode("chat");
    setAtBottom(true);
  };

  const onLocked = (reason: "research" | "image" | "files") => {
    if (isGuest) {
      toast(
        reason === "research"
          ? "Deep research is available on Plus"
          : "Log in to create images and upload files"
      );
      setScreen({ name: "auth", mode: "login" });
    } else setModal("plans");
  };

  const handleMode = (m: ComposerMode) => {
    if (m === "research") return onLocked("research");
    if (m === "image" && isGuest) return onLocked("image");
    setMode(m);
  };

  /* ---------- Auth screen ---------- */
  if (screen.name === "auth") {
    return (
      <div className="aichat fixed inset-0 overflow-y-auto" data-theme={theme}>
        <AuthScreen
          mode={screen.mode}
          onTryFirst={() => setScreen({ name: "app" })}
          onSuccess={(via) => {
            setGuest(false);
            setScreen({ name: "app" });
            engine.newChat();
            toast(`Signed in with ${via === "email" ? "email" : via} — welcome back, Dani`);
          }}
        />
        <Toasts toasts={toasts} />
      </div>
    );
  }

  const sidebarProps = {
    isGuest,
    collapsed,
    onToggle: () => (mobileOpen ? closeMobile() : setCollapsed((c) => !c)),
    conversations: engine.conversations,
    activeId: engine.activeId,
    projects,
    view,
    activeProjectId: projectId,
    onNewChat: newChat,
    onSelectChat: selectChat,
    onRename: engine.renameChat,
    onDelete: engine.deleteChat,
    onPin: engine.togglePin,
    onView: goView,
    onOpenProject: openProject,
    onModal: (m: ModalKey) => {
      setModal(m);
      closeMobile();
    },
    onLogin: () => setScreen({ name: "auth", mode: "login" }),
    onLogout: () => {
      setGuest(true);
      engine.newChat();
      setView("chat");
      setPlan("free");
      toast("You've been logged out");
    },
    onToast: toast,
  };

  const showNudge = isGuest && guestSends >= 3 && !nudgeDismissed;
  const chatLike = view === "chat" || view === "project";
  const centered = chatLike && !hasMessages;

  const composer = (
    <Composer
      onSend={send}
      onStop={engine.stop}
      onVoice={() => setVoice(true)}
      onLocked={onLocked}
      isGenerating={engine.isGenerating}
      isGuest={isGuest}
      mode={mode}
      setMode={handleMode}
      think={think}
      setThink={setThink}
      placeholder={
        view === "project" && project
          ? `New chat in ${project.name}`
          : isGuest
            ? "Ask Hudbird"
            : "Ask anything"
      }
      autoFocus
    />
  );

  return (
    <div className="aichat fixed inset-0 flex overflow-hidden font-sans" data-theme={theme}>
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar {...sidebarProps} />
      </div>

      {/* Mobile drawer — swipe to close */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-[var(--c-overlay)] backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
            />
            <motion.div
              className="fixed inset-y-0 left-0 z-50 flex md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={softSpring}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0.5, right: 0 }}
              onDragEnd={(_, info) =>
                (info.offset.x < -80 || info.velocity.x < -400) && closeMobile()
              }
            >
              <Sidebar {...sidebarProps} mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="relative flex min-w-0 flex-1">
        <motion.main
          className="relative flex min-w-0 flex-1 flex-col"
          style={{ touchAction: "pan-y" }}
          onPanEnd={(_, info) => {
            if (
              window.innerWidth < 768 &&
              info.offset.x > 90 &&
              Math.abs(info.offset.y) < 60 &&
              info.point.x - info.offset.x < 48
            )
              setMobileOpen(true);
          }}
        >
          <Topbar
            isGuest={isGuest}
            model={model}
            onModel={(m) => {
              setModel(m);
              toast(`Switched to ${m.name}`);
            }}
            onModal={setModal}
            onLogin={() => setScreen({ name: "auth", mode: "login" })}
            onSignup={() => setScreen({ name: "auth", mode: "signup" })}
            onMobileMenu={() => setMobileOpen(true)}
            hasChat={hasMessages && chatLike}
            temporary={temporary}
            onTemporary={() => {
              setTemporary((t) => !t);
              engine.newChat();
              setView("chat");
            }}
            onToast={toast}
          />

          <AnimatePresence mode="wait" initial={false}>
            {chatLike ? (
              <motion.div
                key={centered ? `center-${view}-${projectId}` : "thread"}
                className="relative flex min-h-0 flex-1 flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {centered ? (
                  <div className="aichat-scroll flex flex-1 flex-col overflow-y-auto">
                    {view === "project" && project && (
                      <ProjectHeader
                        project={project}
                        conversations={engine.conversations}
                        onSelectChat={selectChat}
                        onToast={toast}
                      />
                    )}
                    <div
                      className={
                        view === "project"
                          ? "mx-auto w-full max-w-[760px] px-4 py-6 sm:px-6"
                          : "mx-auto flex w-full max-w-[760px] flex-1 flex-col justify-center px-4 pb-[12vh] sm:px-6"
                      }
                    >
                      {view !== "project" && <Greeting isGuest={isGuest} temporary={temporary} />}
                      {composer}
                      {view !== "project" && !temporary && (
                        <Suggestions
                          isGuest={isGuest}
                          onMode={handleMode}
                          onPrompt={(p) => send(p, { mode: "chat", think })}
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      ref={scrollRef}
                      onScroll={(e) => {
                        const el = e.currentTarget;
                        setAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 80);
                      }}
                      className="aichat-scroll flex-1 overflow-y-auto"
                    >
                      <Thread
                        messages={messages}
                        onRegenerate={engine.regenerate}
                        onOpenImage={setLightbox}
                        onOpenCanvas={() => !engine.canvas && toast("Canvas restored")}
                        onToast={toast}
                      />
                    </div>

                    <AnimatePresence>
                      {!atBottom && (
                        <motion.button
                          type="button"
                          aria-label="Scroll to bottom"
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.8 }}
                          onClick={() => {
                            setAtBottom(true);
                            scrollRef.current?.scrollTo({
                              top: scrollRef.current.scrollHeight,
                              behavior: "smooth",
                            });
                          }}
                          className="absolute bottom-36 left-1/2 z-10 inline-flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-[var(--c-border-strong)] bg-[var(--c-elevated)] shadow-lg"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </motion.button>
                      )}
                    </AnimatePresence>

                    <div className="relative mx-auto w-full max-w-[760px] px-3 pb-3 sm:px-6">
                      <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-[var(--c-bg)] to-transparent" />
                      <AnimatePresence>
                        {showNudge && (
                          <motion.div
                            initial={{ opacity: 0, y: 16, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 16, scale: 0.97 }}
                            transition={spring}
                            className="mb-3 flex items-center gap-3 rounded-2xl border border-[var(--c-border-strong)] bg-[var(--c-elevated)] p-3 pl-4"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium">Keep this conversation going</p>
                              <p className="text-xs text-[var(--c-muted)]">
                                Log in to save chats, unlock images, files and voice history.
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setScreen({ name: "auth", mode: "login" })}
                              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[var(--c-invert)] px-4 text-sm font-semibold text-[var(--c-invert-text)]"
                            >
                              <LogIn className="h-4 w-4" /> Log in
                            </button>
                            <button
                              type="button"
                              aria-label="Dismiss"
                              onClick={() => setNudgeDismissed(true)}
                              className="rounded-full p-1.5 text-[var(--c-muted)] hover:bg-[var(--c-surface-2)]"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {composer}
                      <p className="mt-2 text-center text-xs text-[var(--c-subtle)]">
                        Hudbird can make mistakes. Check important info.
                      </p>
                    </div>
                  </>
                )}
                {centered && isGuest && (
                  <p className="px-4 pb-3 text-center text-xs text-[var(--c-subtle)]">
                    Hudbird is AI. By messaging, you agree to our{" "}
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="underline underline-offset-2"
                    >
                      Terms
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="underline underline-offset-2"
                    >
                      Privacy Policy
                    </a>
                    .
                  </p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key={view}
                className="min-h-0 flex-1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={softSpring}
              >
                {view === "images" && (
                  <ImagesView
                    images={engine.generatedImages}
                    onOpen={setLightbox}
                    onCreate={(p) => {
                      if (isGuest) return onLocked("image");
                      setView("chat");
                      setProjectId(null);
                      engine.send(p, { mode: "image", think: false, newConversation: true });
                    }}
                  />
                )}
                {view === "library" && (
                  <LibraryView
                    images={engine.generatedImages}
                    onOpen={setLightbox}
                    projects={projects}
                  />
                )}
                {view === "projects" && (
                  <ProjectsView
                    projects={projects}
                    conversations={engine.conversations}
                    onOpen={openProject}
                    onNew={() => setModal("newProject")}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>

        {/* Canvas */}
        <AnimatePresence>
          {engine.canvas && chatLike && (
            <CanvasPanel
              canvas={engine.canvas}
              onClose={() => engine.setCanvas(null)}
              onAction={engine.canvasAction}
              onEdit={engine.updateCanvasContent}
              onToast={toast}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Overlays */}
      <VoiceMode
        open={voice}
        onClose={(r) => {
          setVoice(false);
          if (r) {
            setView("chat");
            engine.appendVoiceExchange(r.user, r.assistant, r.duration);
          }
        }}
      />

      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/85 p-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              layoutId={`img-${lightbox}`}
              src={lightbox}
              alt="Preview"
              className="max-h-[85vh] max-w-full rounded-3xl object-contain shadow-2xl"
              drag
              dragSnapToOrigin
              onDragEnd={(_, info) =>
                Math.hypot(info.offset.x, info.offset.y) > 140 && setLightbox(null)
              }
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              aria-label="Close preview"
              className="absolute top-5 right-5 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <WorkModal
        open={modal === "work"}
        onClose={() => setModal(null)}
        onUnlock={() => setModal("plans")}
      />
      <PlansModal
        open={modal === "plans"}
        plan={plan}
        onClose={() => setModal(null)}
        onUpgrade={(p) => {
          if (isGuest) {
            setModal(null);
            setScreen({ name: "auth", mode: "signup" });
            return;
          }
          setPlan(p);
          setModal(null);
          toast(
            p === "free"
              ? "Switched to Free"
              : `Welcome to Hudbird ${p === "plus" ? "Plus" : "Pro"} ✦`
          );
        }}
      />
      <SettingsModal
        open={modal === "settings"}
        onClose={() => setModal(null)}
        theme={theme}
        onTheme={setTheme}
        onToast={toast}
        onClearChats={engine.clearChats}
      />
      <SearchModal
        open={modal === "search"}
        onClose={() => setModal(null)}
        conversations={engine.conversations}
        onSelect={selectChat}
        onNewChat={newChat}
      />
      <NewProjectModal
        open={modal === "newProject"}
        onClose={() => setModal(null)}
        onCreate={(name, color) => {
          const p: Project = {
            id: `p-${Date.now()}`,
            name,
            color,
            description: "New project — add files and instructions.",
            files: [],
          };
          setProjects((ps) => [p, ...ps]);
          openProject(p.id);
          toast(`Project “${name}” created`);
        }}
      />
      <ShareModal
        open={modal === "share"}
        onClose={() => setModal(null)}
        title={engine.active?.title ?? "Chat"}
      />

      <Toasts toasts={toasts} />
    </div>
  );
}

function Toasts({ toasts }: { toasts: Toast[] }) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[100] flex flex-col items-center gap-2"
      aria-live="polite"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.15 } }}
            transition={spring}
            className="rounded-full bg-[var(--c-invert)] px-4 py-2 text-sm font-medium text-[var(--c-invert-text)] shadow-xl"
          >
            {t.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
