import { useCallback, useEffect, useRef, useState } from "react";
import type { Mail } from "./types";
import type { Tone } from "./data";
import { ME } from "./data";

/* -------------------------------------------------------------------------- */
/*  Simulated AI writer                                                       */
/*  Everything here is deterministic + local so the template works offline.  */
/*  Swap `generateEmail` for a real LLM call when wiring up a backend.        */
/* -------------------------------------------------------------------------- */

export const THINKING_STEPS = [
  "Understanding your intent",
  "Reading thread context",
  "Matching your writing style",
  "Drafting with the selected tone",
  "Polishing grammar & clarity",
];

const openers: Record<Tone, string> = {
  Professional: "I hope you're doing well.",
  Friendly: "Hope your week is going great!",
  Concise: "",
  Persuasive: "I'll keep this short because I think you'll love this.",
  Formal: "I trust this message finds you well.",
};

const closers: Record<Tone, string> = {
  Professional: "Best regards,",
  Friendly: "Cheers,",
  Concise: "Thanks,",
  Persuasive: "Looking forward to making this happen,",
  Formal: "Yours sincerely,",
};

function firstName(fullOrEmail: string) {
  if (!fullOrEmail) return "there";
  const base = fullOrEmail.includes("@") ? fullOrEmail.split("@")[0] : fullOrEmail;
  const n = base.split(/[\s._-]/)[0];
  return n.charAt(0).toUpperCase() + n.slice(1);
}

function bodyFor(prompt: string, tone: Tone, ctx?: Mail | null): string {
  const p = prompt.toLowerCase();
  if (p.includes("decline") || p.includes("tolak")) {
    return "Thank you so much for thinking of me. After reviewing my current commitments, I'm unfortunately not able to take this on right now. I'd love to stay in touch and revisit it next quarter.";
  }
  if (p.includes("follow")) {
    return "I wanted to follow up on my previous note. Do you have any updates, or is there anything else you need from my side to move forward?";
  }
  if (p.includes("meeting") || p.includes("call") || p.includes("schedule")) {
    return "Would you be available for a 30-minute call this week? I have openings on Tuesday at 10:00 or Thursday at 14:00 — happy to adapt to your calendar.\n\nI've also added a tentative hold so we don't lose the slot.";
  }
  if (p.includes("thank")) {
    return "I just wanted to say a sincere thank you. Your help made a real difference, and the whole team noticed the extra care you put in.";
  }
  if (p.includes("invoice") || p.includes("payment")) {
    return "Please find the invoice attached for this month's work. Payment is due within 14 days; let me know if you need it addressed to a different entity.";
  }
  if (ctx) {
    return `Thanks for your email about "${ctx.subject}". I've gone through the details and I'm aligned with the direction.\n\nHere's what I suggest as next steps:\n• I'll share my feedback by end of day tomorrow\n• Let's lock the final decision in our next sync\n• Please loop in anyone else who should weigh in`;
  }
  const topic = prompt.trim().replace(/^(write|draft|compose)\s+(an?\s+)?(email\s+)?(to\s+)?/i, "");
  return `I'm reaching out regarding ${topic || "our upcoming project"}. I've put together a few thoughts and would love your input before we move forward.\n\nIn short:\n• Clear goals and a realistic timeline\n• A lightweight review loop so nothing gets blocked\n• Shared ownership of the final outcome\n\nLet me know what you think.`;
}

export function generateEmail(opts: {
  prompt: string;
  tone: Tone;
  to?: string;
  context?: Mail | null;
}): { subject: string; body: string } {
  const { prompt, tone, to, context } = opts;
  const name = context ? firstName(context.senderName) : firstName(to ?? "");
  const opener = openers[tone];
  const greeting = tone === "Formal" ? `Dear ${name},` : `Hi ${name},`;
  let body = bodyFor(prompt, tone, context);
  if (tone === "Concise") body = body.split("\n\n")[0];
  const text = [
    greeting,
    "",
    opener,
    opener ? "" : null,
    body,
    "",
    closers[tone],
    ME.name.split(" ")[0],
  ]
    .filter((l) => l !== null)
    .join("\n");

  const subject = context
    ? context.subject.startsWith("Re:")
      ? context.subject
      : `Re: ${context.subject}`
    : prompt.length > 3
      ? prompt.charAt(0).toUpperCase() + prompt.slice(1, 60).replace(/^(write|draft)\s+/i, "")
      : "Quick note";

  return { subject, body: text };
}

export function rewrite(text: string, action: "shorten" | "expand" | "formal" | "fix"): string {
  if (!text.trim()) return text;
  switch (action) {
    case "shorten":
      return text
        .split("\n")
        .filter((l, i, arr) => l.trim() === "" || i < 3 || i > arr.length - 3 || l.startsWith("•"))
        .join("\n")
        .replace(/\n{3,}/g, "\n\n");
    case "expand":
      return text.replace(
        /\n\n([^\n]*)$/,
        "\n\nI'm also happy to put together a short doc with options and trade-offs if that would help the decision.\n\n$1"
      );
    case "formal":
      return text
        .replace(/^Hi /m, "Dear ")
        .replace(/Cheers,|Thanks,/g, "Kind regards,")
        .replace(/!+/g, ".");
    case "fix":
      return text
        .replace(/\bi\b/g, "I")
        .replace(/ {2,}/g, " ")
        .replace(/\s+([,.!?])/g, "$1");
  }
}

export function summarize(mail: Mail): string[] {
  if (mail.aiSummary?.length) return mail.aiSummary;
  const sentences = mail.body
    .replace(/\n+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.length > 20);
  return sentences.slice(0, 3);
}

/* -------------------------------------------------------------------------- */
/*  useTypewriter — streams text token-by-token like an LLM response.         */
/* -------------------------------------------------------------------------- */
export function useStreamer() {
  const [text, setText] = useState("");
  const [isStreaming, setStreaming] = useState(false);
  const timer = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (timer.current) window.clearInterval(timer.current);
    timer.current = null;
    setStreaming(false);
  }, []);

  const stream = useCallback(
    (full: string, onDone?: (final: string) => void, speed = 14) => {
      stop();
      setText("");
      setStreaming(true);
      const tokens = full.match(/\S+\s*|\n/g) ?? [];
      let i = 0;
      let acc = "";
      timer.current = window.setInterval(() => {
        // emit 1–3 tokens per tick for a natural cadence
        const n = 1 + Math.floor(Math.random() * 3);
        for (let k = 0; k < n && i < tokens.length; k++) acc += tokens[i++];
        setText(acc);
        if (i >= tokens.length) {
          stop();
          onDone?.(acc);
        }
      }, speed * 3);
    },
    [stop]
  );

  useEffect(() => stop, [stop]);
  return { text, setText, isStreaming, stream, stop };
}

/** Steps through THINKING_STEPS and resolves when finished. */
export function useThinking() {
  const [step, setStep] = useState(-1);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const think = useCallback((steps = THINKING_STEPS, perStep = 420) => {
    clear();
    return new Promise<void>((resolve) => {
      steps.forEach((_, i) => {
        timers.current.push(window.setTimeout(() => setStep(i), i * perStep));
      });
      timers.current.push(
        window.setTimeout(() => {
          setStep(-1);
          resolve();
        }, steps.length * perStep)
      );
    });
  }, []);

  useEffect(() => clear, []);
  return { step, isThinking: step >= 0, think, cancel: () => (clear(), setStep(-1)) };
}

/* -------------------------------------------------------------------------- */
/*  Assistant answers for the AI panel                                         */
/* -------------------------------------------------------------------------- */
export function answerAssistant(q: string, emails: Mail[]): string {
  const s = q.toLowerCase();
  const unread = emails.filter((m) => m.folder === "inbox" && !m.isRead);
  const high = emails.filter((m) => m.aiPriority === "high" && m.folder === "inbox");
  if (s.includes("summar") || s.includes("brief") || s.includes("today")) {
    return `Here's your inbox brief:\n\n• **${unread.length} unread** emails, **${high.length} high priority**\n${high
      .map((m) => `• ${m.senderName} — ${m.subject}`)
      .join("\n")}\n\nI'd reply to Sofia first: she needs a sign-off by Friday.`;
  }
  if (s.includes("meeting") || s.includes("calendar") || s.includes("schedule")) {
    return "You have **2 meetings today**: Design sync with Marcus at 10:00 and the Q4 launch review at 14:00. Tomorrow at 11:00 is the Acme partnership call. Want me to block focus time this afternoon?";
  }
  if (s.includes("invoice") || s.includes("payment") || s.includes("finance")) {
    return "I found **2 finance emails**: a Stripe payout of $12,480.00 (arriving in 2 business days) and Northwind invoice #INV-2041 marked as paid.";
  }
  if (s.includes("unsubscribe") || s.includes("promo") || s.includes("clean")) {
    return "I found **3 promotional senders** you haven't opened in 30 days (Figma, Adobe, Medium). I can archive them and unsubscribe in one click.";
  }
  return `I searched ${emails.length} emails. The most relevant thread is **"${emails[0]?.subject}"** from ${emails[0]?.senderName}. Want me to draft a reply or summarise it?`;
}
