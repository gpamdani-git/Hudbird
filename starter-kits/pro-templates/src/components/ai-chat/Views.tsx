import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUp,
  Code2,
  FileText,
  Folder,
  Globe,
  ImageIcon,
  MessageSquare,
  PenLine,
  Plus,
  Sparkles,
  Upload,
  Telescope,
} from "lucide-react";
import type { ComposerMode, Conversation, Project } from "./types";
import { GALLERY_IMAGES, GUEST_SUGGESTIONS, IMAGE_STYLES } from "./data";
import { cx, softSpring, spring } from "./primitives";

/* ------------------------------------------------------------------ */
/* Empty state                                                         */
/* ------------------------------------------------------------------ */
export function Greeting({ isGuest, temporary }: { isGuest: boolean; temporary: boolean }) {
  const text = temporary
    ? "Temporary Chat"
    : isGuest
      ? "Where should we begin?"
      : "What's on the agenda today?";
  return (
    <div className="mb-7 text-center">
      <motion.h1
        key={text}
        className="text-[26px] font-medium tracking-tight sm:text-[30px]"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.025 } } }}
        aria-label={text}
      >
        {text.split("").map((ch, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="inline-block whitespace-pre"
            variants={{
              hidden: { opacity: 0, y: 10, filter: "blur(8px)" },
              show: { opacity: 1, y: 0, filter: "blur(0px)" },
            }}
            transition={softSpring}
          >
            {ch}
          </motion.span>
        ))}
      </motion.h1>
      {temporary && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mx-auto mt-3 max-w-md text-sm text-[var(--c-muted)]"
        >
          This chat won't appear in history, use or update memory, or be used to train our models.
        </motion.p>
      )}
    </div>
  );
}

export function Suggestions({
  isGuest,
  onMode,
  onPrompt,
}: {
  isGuest: boolean;
  onMode: (m: ComposerMode) => void;
  onPrompt: (p: string) => void;
}) {
  const items: { label: string; icon: React.ReactNode; run: () => void }[] = isGuest
    ? GUEST_SUGGESTIONS.map((s) => ({
        label: s,
        icon: <Sparkles className="h-4 w-4" />,
        run: () => onPrompt(s),
      }))
    : [
        {
          label: "Create an image or sticker",
          icon: <ImageIcon className="h-4 w-4" />,
          run: () => onMode("image"),
        },
        {
          label: "Write or edit",
          icon: <PenLine className="h-4 w-4" />,
          run: () => onMode("write"),
        },
        {
          label: "Search the web",
          icon: <Globe className="h-4 w-4" />,
          run: () => onMode("search"),
        },
        {
          label: "Help me code a React hook",
          icon: <Code2 className="h-4 w-4" />,
          run: () => onPrompt("Write a React hook for dark mode"),
        },
        {
          label: "Deep research",
          icon: <Telescope className="h-4 w-4" />,
          run: () => onMode("research"),
        },
      ];
  return (
    <motion.ul
      className="mt-5 flex flex-col gap-0.5 px-1"
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.25 } } }}
    >
      {items.map((it) => (
        <motion.li
          key={it.label}
          variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
          transition={softSpring}
        >
          <button
            type="button"
            onClick={it.run}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[15px] text-[var(--c-muted)] transition-colors hover:bg-[var(--c-surface)] hover:text-[var(--c-text)]"
          >
            <span className="transition-transform duration-200 group-hover:scale-110">
              {it.icon}
            </span>
            <span className="flex-1">{it.label}</span>
            <ArrowUp className="h-4 w-4 rotate-45 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
          </button>
        </motion.li>
      ))}
    </motion.ul>
  );
}

/* ------------------------------------------------------------------ */
/* Images studio                                                       */
/* ------------------------------------------------------------------ */
export function ImagesView({
  images,
  onOpen,
  onCreate,
}: {
  images: string[];
  onOpen: (src: string) => void;
  onCreate: (prompt: string) => void;
}) {
  const [style, setStyle] = useState(IMAGE_STYLES[0].id);
  const [prompt, setPrompt] = useState("");
  const track = useRef<HTMLDivElement>(null);
  const all = Array.from(new Set([...images, ...GALLERY_IMAGES]));

  return (
    <div className="aichat-scroll h-full overflow-y-auto">
      <div className="mx-auto max-w-6xl px-4 pt-6 pb-16 sm:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-semibold tracking-tight"
        >
          Images
        </motion.h1>
        <p className="mt-1 text-sm text-[var(--c-muted)]">
          Turn any idea into an image. Pick a style, describe it, done.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!prompt.trim()) return;
            const label = IMAGE_STYLES.find((s) => s.id === style)?.label;
            onCreate(`${prompt.trim()} — ${label} style`);
            setPrompt("");
          }}
          data-glow={prompt ? "focus" : undefined}
          className="aichat-glow-ring mt-6 flex items-center gap-2 rounded-full border border-[var(--c-border-strong)] bg-[var(--c-surface)] p-2 pl-5"
        >
          <ImageIcon className="h-5 w-5 shrink-0 text-[var(--c-subtle)]" />
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe a new image"
            aria-label="Image prompt"
            className="flex-1 bg-transparent text-[15px] placeholder:text-[var(--c-subtle)] focus:outline-none"
          />
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={!prompt.trim()}
            className="h-10 rounded-full bg-[var(--c-invert)] px-5 text-sm font-semibold text-[var(--c-invert-text)] transition-opacity disabled:opacity-40"
          >
            Create
          </motion.button>
        </form>

        {/* Style carousel — drag/swipe */}
        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-sm font-medium text-[var(--c-muted)]">Try a style</h2>
          <span className="text-xs text-[var(--c-subtle)]">Drag to explore →</span>
        </div>
        <div ref={track} className="mt-3 overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={track}
            dragElastic={0.12}
            className="flex w-max cursor-grab gap-3 active:cursor-grabbing"
          >
            {IMAGE_STYLES.map((s) => (
              <motion.button
                key={s.id}
                type="button"
                onClick={() => setStyle(s.id)}
                whileHover={{ y: -4 }}
                transition={softSpring}
                className={cx(
                  "relative h-40 w-32 shrink-0 overflow-hidden rounded-2xl border-2 transition-colors",
                  style === s.id ? "border-[var(--c-accent)]" : "border-transparent"
                )}
              >
                <img
                  src={s.image}
                  alt=""
                  draggable={false}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 pt-8 text-left text-sm font-medium text-white">
                  {s.label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        <h2 className="mt-10 mb-3 text-sm font-medium text-[var(--c-muted)]">My images</h2>
        <div className="columns-2 gap-3 sm:columns-3 lg:columns-4">
          {all.map((src, i) => (
            <motion.button
              key={src}
              type="button"
              layoutId={`img-${src}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: Math.min(i, 10) * 0.04 }}
              onClick={() => onOpen(src)}
              className="group relative mb-3 block w-full overflow-hidden rounded-2xl"
            >
              <img
                src={src}
                alt="Generated"
                loading="lazy"
                className={cx(
                  "w-full object-cover transition-transform duration-500 group-hover:scale-105",
                  i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
                )}
              />
              <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Library                                                             */
/* ------------------------------------------------------------------ */
export function LibraryView({
  images,
  onOpen,
  projects,
}: {
  images: string[];
  onOpen: (src: string) => void;
  projects: Project[];
}) {
  const [tab, setTab] = useState<"all" | "images" | "files">("all");
  const files = projects.flatMap((p) =>
    p.files.map((f) => ({ ...f, project: p.name, color: p.color }))
  );
  return (
    <div className="aichat-scroll h-full overflow-y-auto">
      <div className="mx-auto max-w-6xl px-4 pt-6 pb-16 sm:px-8">
        <h1 className="text-3xl font-semibold tracking-tight">Library</h1>
        <div className="mt-5 inline-flex rounded-full bg-[var(--c-surface)] p-1">
          {(["all", "images", "files"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cx(
                "relative z-10 h-8 rounded-full px-4 text-sm font-medium capitalize",
                tab === t ? "text-[var(--c-text)]" : "text-[var(--c-muted)]"
              )}
            >
              {tab === t && (
                <motion.span
                  layoutId="aichat-lib-tab"
                  transition={softSpring}
                  className="absolute inset-0 -z-10 rounded-full bg-[var(--c-surface-3)]"
                />
              )}
              {t}
            </button>
          ))}
        </div>

        {tab !== "files" && (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {images.map((src, i) => (
              <motion.button
                key={src}
                type="button"
                layoutId={`img-${src}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...spring, delay: i * 0.03 }}
                onClick={() => onOpen(src)}
                className="aspect-square overflow-hidden rounded-2xl"
              >
                <img
                  src={src}
                  alt="Library item"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </motion.button>
            ))}
          </div>
        )}
        {tab !== "images" && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-[var(--c-border)]">
            {files.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 border-b border-[var(--c-border)] px-4 py-3 last:border-b-0 hover:bg-[var(--c-surface)]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--c-surface-2)]">
                  <FileText className="h-4 w-4 text-[var(--c-muted)]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{f.name}</span>
                  <span className="block text-xs text-[var(--c-subtle)]">{f.size}</span>
                </span>
                <span className="hidden items-center gap-1.5 text-xs text-[var(--c-muted)] sm:flex">
                  <Folder className="h-3.5 w-3.5" style={{ color: f.color }} /> {f.project}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */
export function ProjectsView({
  projects,
  conversations,
  onOpen,
  onNew,
}: {
  projects: Project[];
  conversations: Conversation[];
  onOpen: (id: string) => void;
  onNew: () => void;
}) {
  return (
    <div className="aichat-scroll h-full overflow-y-auto">
      <div className="mx-auto max-w-5xl px-4 pt-6 pb-16 sm:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={onNew}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--c-invert)] px-4 text-sm font-semibold text-[var(--c-invert-text)]"
          >
            <Plus className="h-4 w-4" /> New project
          </motion.button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const count = conversations.filter((c) => c.projectId === p.id).length;
            return (
              <motion.button
                key={p.id}
                type="button"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => onOpen(p.id)}
                className="group relative overflow-hidden rounded-3xl border border-[var(--c-border)] bg-[var(--c-surface)] p-5 text-left transition-colors hover:border-[var(--c-border-strong)]"
              >
                <div
                  className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full opacity-25 blur-2xl transition-opacity group-hover:opacity-50"
                  style={{ backgroundColor: p.color }}
                />
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: p.color + "22", color: p.color }}
                >
                  <Folder className="h-5 w-5" fill={p.color} fillOpacity={0.3} />
                </span>
                <h3 className="mt-4 font-semibold">{p.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-[var(--c-muted)]">{p.description}</p>
                <div className="mt-4 flex gap-4 text-xs text-[var(--c-subtle)]">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" /> {count} chats
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5" /> {p.files.length} files
                  </span>
                </div>
              </motion.button>
            );
          })}
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={onNew}
            className="flex min-h-[190px] flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-[var(--c-border-strong)] text-sm text-[var(--c-muted)] transition-colors hover:bg-[var(--c-surface)] hover:text-[var(--c-text)]"
          >
            <Plus className="h-5 w-5" /> Create project
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export function ProjectHeader({
  project,
  conversations,
  onSelectChat,
  onToast,
}: {
  project: Project;
  conversations: Conversation[];
  onSelectChat: (id: string) => void;
  onToast: (m: string) => void;
}) {
  const chats = conversations.filter((c) => c.projectId === project.id);
  return (
    <div className="mx-auto w-full max-w-[760px] px-4 pt-6 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <span
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ backgroundColor: project.color + "22", color: project.color }}
        >
          <Folder className="h-6 w-6" fill={project.color} fillOpacity={0.3} />
        </span>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{project.name}</h1>
          <p className="text-sm text-[var(--c-muted)]">{project.description}</p>
        </div>
      </motion.div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onToast("Project instructions saved")}
          className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] p-4 text-left transition-colors hover:border-[var(--c-border-strong)]"
        >
          <p className="text-sm font-medium">Instructions</p>
          <p className="mt-1 text-xs text-[var(--c-subtle)]">
            Tailor how Hudbird responds in this project
          </p>
        </button>
        <button
          type="button"
          onClick={() => onToast("File uploaded to project")}
          className="flex items-center justify-between rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] p-4 text-left transition-colors hover:border-[var(--c-border-strong)]"
        >
          <span>
            <span className="block text-sm font-medium">Files</span>
            <span className="mt-1 block text-xs text-[var(--c-subtle)]">
              {project.files.length ? `${project.files.length} files` : "Add PDFs, docs or sheets"}
            </span>
          </span>
          <Upload className="h-4 w-4 text-[var(--c-muted)]" />
        </button>
      </div>

      {chats.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 text-xs font-medium text-[var(--c-subtle)]">Chats in this project</p>
          <div className="overflow-hidden rounded-2xl border border-[var(--c-border)]">
            {chats.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => onSelectChat(c.id)}
                className="flex w-full items-center gap-3 border-b border-[var(--c-border)] px-4 py-3 text-left last:border-b-0 hover:bg-[var(--c-surface)]"
              >
                <MessageSquare className="h-4 w-4 text-[var(--c-subtle)]" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm">{c.title}</span>
                  <span className="block truncate text-xs text-[var(--c-subtle)]">
                    {c.messages
                      .find((m) => m.role === "assistant")
                      ?.content.replace(/[#*`>|]/g, "")
                      .slice(0, 80)}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
