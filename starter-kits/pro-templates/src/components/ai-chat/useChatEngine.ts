import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CanvasDoc, ComposerMode, Conversation, Message } from "./types";
import {
  CANVAS_DOC,
  GALLERY_IMAGES,
  POLISHED_SUFFIX,
  SEARCH_SOURCES,
  SEED_CONVERSATIONS,
  pickReply,
  pickThinkingSteps,
  titleFromPrompt,
} from "./data";

const uid = () => Math.random().toString(36).slice(2, 10);

export interface SendOptions {
  mode: ComposerMode;
  think: boolean;
  attachments?: { name: string; size: string }[];
  projectId?: string;
  /** Start a fresh conversation regardless of the active one */
  newConversation?: boolean;
}

export type CanvasAction = "polish" | "shorter" | "longer" | "emoji" | "reading";

function hydrate(seed: Conversation[]): Conversation[] {
  return seed.map((c) =>
    c.messages.length
      ? c
      : {
          ...c,
          messages: [
            { id: uid(), role: "user", content: c.title, status: "done", createdAt: c.updatedAt },
            {
              id: uid(),
              role: "assistant",
              content: pickReply(c.title),
              status: "done",
              createdAt: c.updatedAt,
            },
          ],
        }
  );
}

/**
 * Drives the whole chat simulation: thinking traces, token streaming,
 * image generation progress, the write-mode canvas and stop/regenerate.
 * Swap the internals for a real API (SSE / fetch streaming) — the
 * component contract stays the same.
 */
export function useChatEngine() {
  const [conversations, setConversations] = useState<Conversation[]>(() =>
    hydrate(SEED_CONVERSATIONS)
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [canvas, setCanvas] = useState<CanvasDoc | null>(null);
  const [isGenerating, setGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>(GALLERY_IMAGES.slice(0, 6));
  const timers = useRef<number[]>([]);
  const imageCursor = useRef(0);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const later = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timers.current.push(id);
  }, []);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const active = useMemo(
    () => conversations.find((c) => c.id === activeId) ?? null,
    [conversations, activeId]
  );

  const patchMessage = useCallback(
    (
      convId: string,
      msgId: string,
      patch: Partial<Message> | ((m: Message) => Partial<Message>)
    ) => {
      setConversations((cs) =>
        cs.map((c) =>
          c.id !== convId
            ? c
            : {
                ...c,
                updatedAt: Date.now(),
                messages: c.messages.map((msg) =>
                  msg.id === msgId
                    ? { ...msg, ...(typeof patch === "function" ? patch(msg) : patch) }
                    : msg
                ),
              }
        )
      );
    },
    []
  );

  /** Token-ish streaming: variable chunk sizes & jitter so it reads like a real model. */
  const stream = useCallback(
    (full: string, onChunk: (text: string) => void, onDone: () => void, startAt = 0) => {
      let i = startAt;
      const tick = () => {
        i = Math.min(full.length, i + 3 + Math.floor(Math.random() * 7));
        onChunk(full.slice(0, i));
        if (i < full.length) later(tick, 14 + Math.random() * 22);
        else onDone();
      };
      tick();
    },
    [later]
  );

  const runAssistant = useCallback(
    (convId: string, msgId: string, prompt: string, opts: SendOptions) => {
      setGenerating(true);
      const finish = () => {
        patchMessage(convId, msgId, { status: "done" });
        setGenerating(false);
      };

      /* ---------------- Image generation ---------------- */
      if (opts.mode === "image") {
        patchMessage(convId, msgId, { status: "generating", progress: 0, content: "" });
        let p = 0;
        const step = () => {
          p = Math.min(100, p + 2 + Math.random() * 5);
          patchMessage(convId, msgId, { progress: p });
          if (p < 100) later(step, 120);
          else {
            const img = GALLERY_IMAGES[imageCursor.current % GALLERY_IMAGES.length];
            imageCursor.current += 1;
            setGeneratedImages((prev) => [img, ...prev.filter((x) => x !== img)]);
            patchMessage(convId, msgId, { images: [img], progress: 100 });
            stream(
              "Here's your image. Want me to try a different style, aspect ratio or lighting?",
              (t) => patchMessage(convId, msgId, { content: t, status: "streaming" }),
              finish
            );
          }
        };
        later(step, 400);
        return;
      }

      const reply = pickReply(prompt);
      const steps =
        opts.mode === "search"
          ? [
              "Searching the web",
              "Reading 3 sources",
              "Cross-checking facts",
              "Summarizing findings",
            ]
          : opts.mode === "write"
            ? ["Outlining structure", "Choosing tone of voice", "Drafting in canvas"]
            : pickThinkingSteps(prompt, opts.think);

      const shouldThink = opts.think || opts.mode !== "chat";
      const thinkMs = 850;

      const startStreaming = () => {
        if (opts.mode === "write") {
          const title = titleFromPrompt(prompt);
          const doc = CANVAS_DOC(prompt);
          setCanvas({ title, content: "", status: "streaming", version: 1 });
          stream(
            doc,
            (t) => setCanvas((c) => (c ? { ...c, content: t } : c)),
            () => setCanvas((c) => (c ? { ...c, status: "done" } : c))
          );
          patchMessage(convId, msgId, { canvasTitle: title });
          stream(
            `I've drafted **${title}** in the canvas. Edit it directly, or use the toolbar to adjust length, reading level, or add a final polish.`,
            (t) => patchMessage(convId, msgId, { content: t, status: "streaming" }),
            finish
          );
          return;
        }
        if (opts.mode === "search") patchMessage(convId, msgId, { sources: SEARCH_SOURCES });
        stream(
          reply,
          (t) => patchMessage(convId, msgId, { content: t, status: "streaming" }),
          finish
        );
      };

      if (!shouldThink) {
        patchMessage(convId, msgId, { status: "pending" });
        later(startStreaming, 700);
        return;
      }

      patchMessage(convId, msgId, {
        status: "thinking",
        thinking: { steps, visible: 1, durationSec: Math.round((steps.length * thinkMs) / 1000) },
      });
      steps.forEach((_, idx) => {
        if (idx === 0) return;
        later(
          () =>
            patchMessage(convId, msgId, (msg) => ({
              thinking: msg.thinking && { ...msg.thinking, visible: idx + 1 },
            })),
          idx * thinkMs
        );
      });
      later(startStreaming, steps.length * thinkMs + 250);
    },
    [later, patchMessage, stream]
  );

  const send = useCallback(
    (text: string, opts: SendOptions) => {
      const prompt = text.trim();
      if (!prompt || isGenerating) return;
      const userMsg: Message = {
        id: uid(),
        role: "user",
        content: prompt,
        status: "done",
        createdAt: Date.now(),
        mode: opts.mode,
        attachments: opts.attachments,
      };
      const aiMsg: Message = {
        id: uid(),
        role: "assistant",
        content: "",
        status: "pending",
        createdAt: Date.now(),
        mode: opts.mode,
      };

      let convId = opts.newConversation ? null : activeId;
      if (!convId) {
        convId = uid();
        const conv: Conversation = {
          id: convId,
          title: titleFromPrompt(prompt),
          messages: [userMsg, aiMsg],
          updatedAt: Date.now(),
          projectId: opts.projectId,
        };
        setConversations((cs) => [conv, ...cs]);
        setActiveId(convId);
      } else {
        const id = convId;
        setConversations((cs) =>
          cs.map((c) =>
            c.id === id
              ? { ...c, updatedAt: Date.now(), messages: [...c.messages, userMsg, aiMsg] }
              : c
          )
        );
      }
      const id = convId;
      setGenerating(true);
      later(() => runAssistant(id, aiMsg.id, prompt, opts), 60);
    },
    [activeId, isGenerating, later, runAssistant]
  );

  const stop = useCallback(() => {
    clearTimers();
    setGenerating(false);
    setCanvas((c) => (c ? { ...c, status: "done" } : c));
    setConversations((cs) =>
      cs.map((c) => ({
        ...c,
        messages: c.messages.map((msg) =>
          msg.status === "done"
            ? msg
            : { ...msg, status: "done", content: msg.content || "_Response stopped._" }
        ),
      }))
    );
  }, []);

  const regenerate = useCallback(
    (msgId: string) => {
      if (!active || isGenerating) return;
      const idx = active.messages.findIndex((x) => x.id === msgId);
      const prev = active.messages
        .slice(0, idx)
        .reverse()
        .find((x) => x.role === "user");
      if (!prev) return;
      patchMessage(active.id, msgId, {
        content: "",
        images: undefined,
        sources: undefined,
        thinking: undefined,
      });
      runAssistant(active.id, msgId, prev.content, { mode: prev.mode ?? "chat", think: true });
    },
    [active, isGenerating, patchMessage, runAssistant]
  );

  /** Called by Voice Mode once the spoken exchange ends. */
  const appendVoiceExchange = useCallback(
    (userText: string, aiText: string, durationSec: number) => {
      const userMsg: Message = {
        id: uid(),
        role: "user",
        content: userText,
        status: "done",
        createdAt: Date.now(),
        voice: { durationSec },
      };
      const aiMsg: Message = {
        id: uid(),
        role: "assistant",
        content: aiText,
        status: "done",
        createdAt: Date.now(),
        mode: "chat",
      };
      if (!activeId) {
        const id = uid();
        setConversations((cs) => [
          {
            id,
            title: "Voice chat — focus tips",
            messages: [userMsg, aiMsg],
            updatedAt: Date.now(),
          },
          ...cs,
        ]);
        setActiveId(id);
      } else {
        setConversations((cs) =>
          cs.map((c) =>
            c.id === activeId ? { ...c, messages: [...c.messages, userMsg, aiMsg] } : c
          )
        );
      }
    },
    [activeId]
  );

  const canvasAction = useCallback(
    (action: CanvasAction) => {
      if (!canvas || canvas.status === "streaming") return;
      let next = canvas.content;
      if (action === "polish") next = canvas.content.replace(POLISHED_SUFFIX, "") + POLISHED_SUFFIX;
      if (action === "shorter") next = canvas.content.split("## What's next")[0].trim();
      if (action === "longer")
        next =
          canvas.content +
          "\n\n## Why now\n\nRemote and hybrid work made context-switching the default. The tools that win the next decade will be the ones that **protect attention** instead of competing for it.";
      if (action === "emoji")
        next = canvas.content
          .replace("## The problem", "## 😩 The problem")
          .replace("## Our approach", "## ✨ Our approach")
          .replace("## What's next", "## 🚀 What's next");
      if (action === "reading")
        next = canvas.content.replace(
          "Every great product begins with a simple observation",
          "Here's the simple idea behind everything we do"
        );
      const start = Math.max(0, commonPrefix(canvas.content, next) - 40);
      setCanvas({
        ...canvas,
        content: next.slice(0, start),
        status: "streaming",
        version: canvas.version + 1,
      });
      stream(
        next,
        (t) => setCanvas((c) => (c ? { ...c, content: t } : c)),
        () => setCanvas((c) => (c ? { ...c, status: "done" } : c)),
        start
      );
    },
    [canvas, stream]
  );

  /* ---------------- Conversation management ---------------- */
  const newChat = useCallback(() => {
    if (isGenerating) stop();
    setActiveId(null);
    setCanvas(null);
  }, [isGenerating, stop]);

  const selectChat = useCallback(
    (id: string) => {
      if (isGenerating) stop();
      setActiveId(id);
      setCanvas(null);
    },
    [isGenerating, stop]
  );

  const renameChat = useCallback((id: string, title: string) => {
    setConversations((cs) => cs.map((c) => (c.id === id ? { ...c, title } : c)));
  }, []);

  const deleteChat = useCallback(
    (id: string) => {
      setConversations((cs) => cs.filter((c) => c.id !== id));
      if (activeId === id) {
        setActiveId(null);
        setCanvas(null);
      }
    },
    [activeId]
  );

  const togglePin = useCallback((id: string) => {
    setConversations((cs) => cs.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c)));
  }, []);

  const updateCanvasContent = useCallback((content: string) => {
    setCanvas((c) => (c ? { ...c, content } : c));
  }, []);

  const clearChats = useCallback(() => {
    clearTimers();
    setGenerating(false);
    setConversations([]);
    setActiveId(null);
    setCanvas(null);
  }, []);

  return {
    conversations,
    active,
    activeId,
    canvas,
    setCanvas,
    isGenerating,
    generatedImages,
    send,
    stop,
    regenerate,
    appendVoiceExchange,
    canvasAction,
    updateCanvasContent,
    newChat,
    selectChat,
    renameChat,
    deleteChat,
    togglePin,
    clearChats,
  };
}

function commonPrefix(a: string, b: string) {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  return i;
}

export type ChatEngine = ReturnType<typeof useChatEngine>;
