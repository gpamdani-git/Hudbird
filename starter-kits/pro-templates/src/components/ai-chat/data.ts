import type { Conversation, ModelOption, Project, Message } from "./types";

export const BRAND = "Hudbird AI";

export const GALLERY_IMAGES = [
  "/assets/ai-chat/astro-cat.jpg",
  "/assets/ai-chat/neon-city.jpg",
  "/assets/nano_banana.jpg",
  "/assets/hospitality/bali_sunset_bar.webp",
  "/assets/hospitality/luxury_pool_villa.webp",
  "/assets/hospitality/flower_bath.webp",
  "/assets/hospitality/rock_bar_cocktail.webp",
  "/assets/hospitality/wellness_yoga.webp",
];

export const IMAGE_STYLES = [
  { id: "cinematic", label: "Cinematic", image: "/assets/ai-chat/neon-city.jpg" },
  { id: "dreamy", label: "Dreamy", image: "/assets/ai-chat/astro-cat.jpg" },
  { id: "photo", label: "Photoreal", image: "/assets/hospitality/luxury_pool_villa.webp" },
  { id: "golden", label: "Golden hour", image: "/assets/hospitality/bali_sunset_bar.webp" },
  { id: "botanical", label: "Botanical", image: "/assets/hospitality/flower_bath.webp" },
  { id: "editorial", label: "Editorial", image: "/assets/hospitality/rock_bar_cocktail.webp" },
  { id: "calm", label: "Calm", image: "/assets/hospitality/wellness_yoga.webp" },
];

export const MODELS: ModelOption[] = [
  { id: "auto", name: "Hudbird 5", description: "Decides how long to think" },
  { id: "instant", name: "Hudbird 5 Instant", description: "Answers right away" },
  {
    id: "thinking",
    name: "Hudbird 5 Thinking",
    description: "Thinks longer for better answers",
    locked: true,
  },
  { id: "pro", name: "Hudbird 5 Pro", description: "Research-grade intelligence", locked: true },
];

export const PROJECT_COLORS = [
  "#8b5cf6",
  "#3d7bff",
  "#22d3ee",
  "#10b981",
  "#f59e0b",
  "#f472b6",
  "#ef4444",
];

export const SEED_PROJECTS: Project[] = [
  {
    id: "p-launch",
    name: "Product Launch",
    color: "#8b5cf6",
    description: "Messaging, launch checklist and press kit for the Q4 release.",
    files: [
      { name: "positioning-brief.pdf", size: "1.2 MB" },
      { name: "launch-timeline.xlsx", size: "84 KB" },
    ],
  },
  {
    id: "p-research",
    name: "Market Research",
    color: "#22d3ee",
    description: "Competitor teardown and interview synthesis.",
    files: [{ name: "interviews.csv", size: "312 KB" }],
  },
  {
    id: "p-travel",
    name: "Japan Trip",
    color: "#f59e0b",
    description: "14-day itinerary across Tokyo, Kyoto and Hokkaido.",
    files: [],
  },
];

const now = Date.now();
const H = 3_600_000;
const D = 24 * H;

const m = (role: Message["role"], content: string, extra: Partial<Message> = {}): Message => ({
  id: Math.random().toString(36).slice(2),
  role,
  content,
  status: "done",
  createdAt: now,
  ...extra,
});

export const SEED_CONVERSATIONS: Conversation[] = [
  {
    id: "c-1",
    title: "Landing page hero copy",
    updatedAt: now - 2 * H,
    pinned: true,
    messages: [
      m("user", "Write 3 hero headline options for an AI design tool."),
      m(
        "assistant",
        "Here are three directions, each with a different emotional hook:\n\n1. **Design at the speed of thought.** — leads with velocity.\n2. **Your taste, multiplied.** — leads with creative identity.\n3. **From blank canvas to shipped in an afternoon.** — leads with outcome.\n\nIf your audience is product teams, I'd test **#3** first; it frames the tool around a concrete result rather than an abstract promise.",
        {
          thinking: {
            steps: ["Identifying audience", "Exploring hooks"],
            visible: 2,
            durationSec: 3,
          },
        }
      ),
    ],
  },
  {
    id: "c-2",
    title: "React useDebounce hook",
    updatedAt: now - 5 * H,
    projectId: "p-launch",
    messages: [
      m("user", "Give me a typed useDebounce hook in React."),
      m(
        "assistant",
        'Here\'s a small, fully typed hook:\n\n```tsx\nimport { useEffect, useState } from "react";\n\nexport function useDebounce<T>(value: T, delay = 300): T {\n  const [debounced, setDebounced] = useState(value);\n\n  useEffect(() => {\n    const id = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(id);\n  }, [value, delay]);\n\n  return debounced;\n}\n```\n\nUse it for search inputs so you only query after the user pauses typing.'
      ),
    ],
  },
  {
    id: "c-3",
    title: "Kyoto ryokan shortlist",
    updatedAt: now - 1.2 * D,
    projectId: "p-travel",
    messages: [],
  },
  { id: "c-4", title: "Explain vector databases", updatedAt: now - 1.5 * D, messages: [] },
  {
    id: "c-5",
    title: "Competitor pricing table",
    updatedAt: now - 3 * D,
    projectId: "p-research",
    messages: [],
  },
  { id: "c-6", title: "Weekly meal prep plan", updatedAt: now - 4 * D, messages: [] },
  {
    id: "c-7",
    title: "Investor update draft",
    updatedAt: now - 6 * D,
    projectId: "p-launch",
    messages: [],
  },
  { id: "c-8", title: "SQL window functions", updatedAt: now - 12 * D, messages: [] },
  { id: "c-9", title: "Brand naming ideas", updatedAt: now - 18 * D, messages: [] },
  { id: "c-10", title: "Tailwind v4 migration", updatedAt: now - 25 * D, messages: [] },
];

export const GUEST_SUGGESTIONS = [
  "Plan a 3-day trip to Bali",
  "Explain quantum computing simply",
  "Write a React hook for dark mode",
  "Compare iPhone vs Pixel cameras",
];

/* --------------------------------------------------------------------------
   Canned replies — picked by keyword so the simulation feels contextual.
   -------------------------------------------------------------------------- */

const CODE_REPLY = `Sure — here's a clean, production-ready approach.

## Implementation

\`\`\`tsx
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme(initial: Theme = "dark") {
  const [theme, setTheme] = useState<Theme>(() =>
    (localStorage.getItem("theme") as Theme) ?? initial
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return { theme, toggle } as const;
}
\`\`\`

## Why this works

- **Lazy initial state** reads \`localStorage\` only once on mount.
- The effect keeps the DOM and storage **in sync** with a single source of truth.
- Returning \`as const\` gives you a precise tuple-like type at the call site.

> Tip: pair this with \`prefers-color-scheme\` to respect the OS setting on first visit.`;

const TRIP_REPLY = `Here's a balanced itinerary that mixes iconic spots with slower moments.

## Day 1 — Ubud
- **Morning:** Tegallalang rice terraces before the crowds (go at 7am).
- **Afternoon:** Sacred Monkey Forest, then lunch at a warung.
- **Evening:** Kecak fire dance at Pura Dalem.

## Day 2 — East coast
- **Morning:** Tirta Gangga water palace.
- **Afternoon:** Snorkel at Blue Lagoon, Padangbai.
- **Evening:** Seafood dinner on Jimbaran beach at sunset.

## Day 3 — Uluwatu
- **Morning:** Slow breakfast and a beach club in Bingin.
- **Afternoon:** Cliffside temple walk.
- **Evening:** Sunset drinks at a rock bar.

---

**Budget estimate:** around **$120–$180/day** per person including a private driver (~$45/day). Want me to turn this into a printable checklist?`;

const COMPARE_REPLY = `Here's a side-by-side comparison of the key differences:

| Feature | Option A | Option B |
| --- | --- | --- |
| Main camera | 48 MP, f/1.78 | 50 MP, f/1.68 |
| Zoom | 5× optical | 5× optical, 30× Super Res |
| Video | 4K60 Dolby Vision | 4K60, Video Boost |
| Low light | Very good | Excellent |
| Editing | Photographic Styles | Magic Editor, Best Take |

## Verdict
- Choose **Option A** for video and ecosystem consistency.
- Choose **Option B** for still photography and AI-powered editing.

Both are excellent — the difference is mostly in **workflow**, not image quality.`;

const EXPLAIN_REPLY = `Great question. Let's build it up from intuition.

## The core idea
A classical bit is either **0 or 1**. A quantum bit — a *qubit* — can exist in a **superposition** of both until it's measured.

## Why it matters
1. **Superposition** lets a quantum computer explore many possibilities at once.
2. **Entanglement** links qubits so the state of one instantly informs another.
3. **Interference** amplifies correct answers and cancels wrong ones.

> Think of it like a maze: a classical computer tries each path one by one, while a quantum computer lets waves flow through every path and lets the dead ends cancel out.

## Where it's useful today
- Simulating molecules for **drug discovery**
- **Optimization** problems in logistics
- Breaking (and rebuilding) **cryptography**

Want a deeper dive into any of these?`;

const DEFAULT_REPLY = (
  prompt: string
) => `Here's a structured take on **"${prompt.slice(0, 60)}${prompt.length > 60 ? "…" : ""}"**.

## Key points
- **Start with the goal.** Define what success looks like before choosing tools.
- **Break it down.** Split the work into small, testable steps.
- **Iterate quickly.** Ship a rough version, gather feedback, refine.

## Suggested next steps
1. Write down the single outcome you care about most.
2. List the constraints — time, budget, and people.
3. Pick the smallest experiment that proves the idea.

Would you like me to expand any of these into a detailed plan?`;

export function pickReply(prompt: string): string {
  const p = prompt.toLowerCase();
  if (/(code|react|hook|function|typescript|component|css|api)/.test(p)) return CODE_REPLY;
  if (/(trip|travel|itinerary|bali|vacation|plan a)/.test(p)) return TRIP_REPLY;
  if (/(compare|vs|versus|table|difference)/.test(p)) return COMPARE_REPLY;
  if (/(explain|what is|how does|quantum|why)/.test(p)) return EXPLAIN_REPLY;
  return DEFAULT_REPLY(prompt);
}

export function pickThinkingSteps(prompt: string, deep: boolean): string[] {
  const p = prompt.toLowerCase();
  const base = /(code|react|hook)/.test(p)
    ? [
        "Parsing the request",
        "Recalling React best practices",
        "Drafting a typed implementation",
        "Reviewing edge cases",
      ]
    : /(trip|travel|bali)/.test(p)
      ? [
          "Mapping regions and travel times",
          "Balancing pace and highlights",
          "Estimating budget",
          "Formatting itinerary",
        ]
      : [
          "Understanding the question",
          "Gathering relevant knowledge",
          "Structuring the answer",
          "Checking for clarity",
        ];
  return deep ? [...base, "Double-checking facts", "Polishing the final response"] : base;
}

export const SEARCH_SOURCES = [
  { title: "The Verge — Hands-on review", domain: "theverge.com" },
  { title: "Wikipedia — Overview", domain: "wikipedia.org" },
  { title: "Reuters — Latest coverage", domain: "reuters.com" },
];

export const CANVAS_DOC = (prompt: string) => `# ${titleFromPrompt(prompt)}

Every great product begins with a simple observation: people want to spend less time fighting their tools and more time doing work that matters.

## The problem

Teams today juggle dozens of apps. Context is scattered, decisions get lost in threads, and the cost of switching adds up to **hours every week**.

## Our approach

We built a single, calm workspace where ideas move from draft to done without friction:

- **One canvas** for writing, planning and reviewing.
- **AI that understands context**, not just keywords.
- **Real-time collaboration** that feels like sitting side by side.

## What's next

Over the coming months we'll open early access to a small group of teams. If you care about craft, speed and focus — we'd love to build this with you.

*— The ${BRAND} team*`;

export const POLISHED_SUFFIX = `

---

**Key takeaway:** less switching, more shipping. Join the waitlist today and help shape the future of focused work.`;

export function titleFromPrompt(prompt: string): string {
  const clean = prompt.replace(/^(write|draft|create|make)\s+(me\s+)?(a|an)?\s*/i, "").trim();
  const t = clean.charAt(0).toUpperCase() + clean.slice(1);
  return t.length > 48 ? t.slice(0, 48) + "…" : t || "Untitled document";
}

export const VOICE_SCRIPT = {
  user: "Hey, can you give me three quick tips to stay focused while working from home?",
  assistant:
    "Absolutely. First, set a dedicated workspace — even a corner of a table works, as long as it's only for work. Second, time-block your day into ninety-minute focus sessions with real breaks in between. And third, put your phone in another room during deep work. Small friction goes a long way.",
};
