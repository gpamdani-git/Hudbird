import type { AppNotification, CalendarEvent, CustomFolder, Mail } from "./types";

const MIN = 60_000;
const ago = (minutes: number) => new Date(Date.now() - minutes * MIN).toISOString();
const dayOffset = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

export const ME = {
  name: "Alex Morgan",
  email: "alex@hudmail.ai",
  plan: "Free",
};

export const IMG = {
  hero: "/assets/ai-mail/ai-hero.jpg",
  moodboard: "/assets/ai-mail/moodboard.jpg",
  offsite: "/assets/ai-mail/offsite.jpg",
  neon: "/assets/ai-chat/neon-city.jpg",
  cat: "/assets/ai-chat/astro-cat.jpg",
};

export const SEED_FOLDERS: CustomFolder[] = [
  { id: "f:clients", name: "Clients", color: "#3b82f6" },
  { id: "f:design", name: "Design Reviews", color: "#8b5cf6" },
  { id: "f:finance", name: "Finance", color: "#10b981" },
  { id: "f:travel", name: "Travel", color: "#f59e0b" },
];

export const MOCK_EMAILS: Mail[] = [
  {
    id: "m1",
    senderName: "Sofia Lindqvist",
    senderEmail: "sofia@northwind.io",
    subject: "Q4 launch plan — need your sign-off by Friday",
    preview:
      "Hi Alex, attaching the final launch deck. Two open questions on pricing tiers and the…",
    body: `Hi Alex,

Attaching the final Q4 launch deck. We're almost there — two open questions remain before we lock the plan:

1. Should the Pro tier include the AI writing assistant, or keep it as an add-on?
2. Can we move the press embargo from Oct 14 to Oct 16 to align with the partner webinar?

I'd love your sign-off by Friday so design can finalise the landing page.

Thanks!
Sofia`,
    date: ago(8),
    folder: "inbox",
    labels: ["work"],
    isRead: false,
    isStarred: true,
    isImportant: true,
    aiPriority: "high",
    aiSummary: [
      "Sofia needs your sign-off on the Q4 launch deck by Friday.",
      "Decide if the AI writing assistant ships in Pro or as an add-on.",
      "Proposal to move the press embargo from Oct 14 → Oct 16.",
    ],
    attachments: [
      { name: "Q4-Launch-Deck.pdf", size: "4.2 MB", type: "document", url: "#" },
      { name: "hero-concept.jpg", size: "1.1 MB", type: "image", url: IMG.hero },
    ],
    threadCount: 3,
  },
  {
    id: "m2",
    senderName: "Marcus Chen",
    senderEmail: "marcus@pixelforge.design",
    subject: "Moodboard v2 for the mobile redesign",
    preview: "Here's the updated moodboard with the violet + cobalt direction we discussed…",
    body: `Hey Alex,

Here's the updated moodboard with the violet + cobalt direction we discussed on Tuesday. I leaned into softer neutrals for the backgrounds and kept the accent for primary actions only.

Let me know if you want to jump on a 20-minute call tomorrow to walk through it.

Cheers,
Marcus`,
    date: ago(46),
    folder: "inbox",
    labels: ["work"],
    isRead: false,
    isStarred: false,
    aiPriority: "medium",
    aiSummary: [
      "Marcus shared moodboard v2 (violet + cobalt direction).",
      "Accent colour reserved for primary actions only.",
      "He suggests a 20-minute walkthrough call tomorrow.",
    ],
    attachments: [
      { name: "moodboard-v2.jpg", size: "2.8 MB", type: "image", url: IMG.moodboard },
      { name: "palette.fig", size: "640 KB", type: "document", url: "#" },
    ],
  },
  {
    id: "m3",
    senderName: "Stripe",
    senderEmail: "receipts@stripe.com",
    subject: "Your payout of $12,480.00 is on the way",
    preview: "A payout of $12,480.00 has been initiated to your bank account ending in 4821…",
    body: `Hi Alex,

A payout of $12,480.00 has been initiated to your bank account ending in 4821. It should arrive within 2 business days.

You can view the full breakdown in your Stripe Dashboard.

— The Stripe Team`,
    date: ago(130),
    folder: "inbox",
    labels: ["finance"],
    isRead: true,
    isStarred: false,
    aiPriority: "low",
    aiSummary: [
      "Payout of $12,480.00 initiated to account ••4821.",
      "Arrives within 2 business days.",
    ],
  },
  {
    id: "m4",
    senderName: "Priya Raman",
    senderEmail: "priya@hudmail.ai",
    subject: "Team offsite photos 📸",
    preview: "What a day! Sharing a few favourites from the rooftop session. Full album in Drive…",
    body: `Hi team,

What a day! Sharing a few favourites from the rooftop session. The full album is in the shared Drive folder.

Huge thanks to everyone who made it — the roadmap workshop was the most productive we've had all year.

Priya`,
    date: ago(320),
    folder: "inbox",
    labels: ["social"],
    isRead: false,
    isStarred: false,
    aiPriority: "low",
    aiSummary: [
      "Priya shared offsite photos; full album is in Drive.",
      "Roadmap workshop was a big success.",
    ],
    attachments: [
      { name: "rooftop-01.jpg", size: "3.4 MB", type: "image", url: IMG.offsite },
      { name: "rooftop-02.jpg", size: "2.9 MB", type: "image", url: IMG.neon },
    ],
  },
  {
    id: "m5",
    senderName: "Linear",
    senderEmail: "notifications@linear.app",
    subject: "3 issues assigned to you in Mobile v2",
    preview: "HUD-482 Inbox swipe gestures · HUD-490 AI compose streaming · HUD-501 Dark mode…",
    body: `You have 3 new issues assigned in Mobile v2:

• HUD-482 Inbox swipe gestures
• HUD-490 AI compose streaming
• HUD-501 Dark mode contrast audit

Open Linear to view details.`,
    date: ago(60 * 20),
    folder: "inbox",
    labels: ["updates"],
    isRead: true,
    isStarred: true,
    aiPriority: "medium",
    aiSummary: [
      "3 new issues assigned in Mobile v2.",
      "Includes AI compose streaming and dark mode audit.",
    ],
  },
  {
    id: "m6",
    senderName: "Daniel Okafor",
    senderEmail: "daniel@acme.co",
    subject: "Partnership proposal — Acme × HudMail",
    preview: "Following our call, I've outlined how an integration could work for our 40k teams…",
    body: `Hi Alex,

Following our call, I've outlined how a native integration could work for our 40k teams. The short version: Acme would surface HudMail's AI summaries directly inside our project timelines.

Would you be open to a pilot in November? Happy to work around your schedule.

Best regards,
Daniel Okafor
Head of Partnerships, Acme`,
    date: ago(60 * 27),
    folder: "inbox",
    labels: ["work"],
    isRead: true,
    isStarred: false,
    isImportant: true,
    aiPriority: "high",
    aiSummary: [
      "Acme proposes a native integration for 40k teams.",
      "They'd surface HudMail AI summaries in project timelines.",
      "Asks if you're open to a November pilot.",
    ],
    attachments: [{ name: "Acme-Proposal.pdf", size: "1.8 MB", type: "document", url: "#" }],
  },
  {
    id: "m7",
    senderName: "Figma",
    senderEmail: "no-reply@figma.com",
    subject: "Config 2026 replays are live",
    preview: "Catch up on every keynote and session from Config 2026, now streaming on demand…",
    body: `Config 2026 replays are live. Catch up on every keynote and session, now streaming on demand.`,
    date: ago(60 * 50),
    folder: "inbox",
    labels: ["promotions"],
    isRead: true,
    isStarred: false,
    aiPriority: "low",
  },
  {
    id: "m8",
    senderName: "Emma Watson",
    senderEmail: "emma@lumen.studio",
    subject: "Re: Brand guidelines feedback",
    preview: "Thanks for the thorough notes! I've applied most of them — see the updated PDF…",
    body: `Thanks for the thorough notes, Alex! I've applied most of them — see the updated PDF.

The only one I pushed back on is the minimum logo size; 24px is the smallest it reads well on retina screens.

Emma`,
    date: ago(60 * 74),
    folder: "f:design",
    labels: ["work"],
    isRead: true,
    isStarred: false,
    threadCount: 4,
    thread: [
      {
        id: "t1",
        senderName: "Alex Morgan",
        senderEmail: ME.email,
        date: ago(60 * 80),
        subject: "Brand guidelines feedback",
        body: "Hi Emma — great first pass! A few notes on spacing, logo clear-space and the secondary palette are inline in the PDF.",
      },
    ],
  },
  {
    id: "m9",
    senderName: "Booking.com",
    senderEmail: "noreply@booking.com",
    subject: "Your stay in Lisbon is confirmed",
    preview: "Memmo Alfama · Oct 18 – Oct 21 · Confirmation #4829104…",
    body: `Your stay is confirmed!

Memmo Alfama, Lisbon
Check-in: Oct 18 · Check-out: Oct 21
Confirmation #4829104`,
    date: ago(60 * 96),
    folder: "f:travel",
    labels: ["personal"],
    isRead: true,
    isStarred: false,
  },
  {
    id: "m10",
    senderName: "Northwind Billing",
    senderEmail: "billing@northwind.io",
    subject: "Invoice #INV-2041 paid",
    preview: "Thank you! We've received your payment of $2,400.00 for September…",
    body: `Thank you! We've received your payment of $2,400.00 for September.`,
    date: ago(60 * 120),
    folder: "f:finance",
    labels: ["finance"],
    isRead: true,
    isStarred: false,
  },
  {
    id: "m11",
    senderName: "Jordan Blake",
    senderEmail: "jordan@clientco.com",
    subject: "Website kickoff next week?",
    preview: "Hey Alex — we're ready to kick off the website project. Does Tuesday 10am work…",
    body: `Hey Alex — we're ready to kick off the website project. Does Tuesday at 10am work for a kickoff call?`,
    date: ago(60 * 30),
    folder: "f:clients",
    labels: ["work"],
    isRead: false,
    isStarred: false,
    aiPriority: "medium",
  },
  // Sent
  {
    id: "s1",
    senderName: ME.name,
    senderEmail: ME.email,
    to: "marcus@pixelforge.design",
    subject: "Re: Moodboard v1",
    preview: "Love the direction! Could we try a cooler accent and test it in dark mode…",
    body: `Love the direction! Could we try a cooler accent and test it in dark mode before Tuesday?

Alex`,
    date: ago(60 * 26),
    folder: "sent",
    labels: ["work"],
    isRead: true,
    isStarred: false,
  },
  {
    id: "s2",
    senderName: ME.name,
    senderEmail: ME.email,
    to: "team@hudmail.ai",
    subject: "Weekly update — AI compose is live in beta",
    preview: "Team, quick update: AI compose with streaming and tone control shipped to beta…",
    body: `Team,

Quick update: AI compose with streaming and tone control shipped to 15% of beta users today. Early signal: 38% of new emails now start from an AI draft.

Next up: smart scheduling from email threads.

Alex`,
    date: ago(60 * 52),
    folder: "sent",
    labels: ["work"],
    isRead: true,
    isStarred: true,
    attachments: [{ name: "beta-metrics.png", size: "820 KB", type: "image", url: IMG.hero }],
  },
  // Drafts
  {
    id: "d1",
    senderName: ME.name,
    senderEmail: ME.email,
    to: "daniel@acme.co",
    subject: "Re: Partnership proposal — Acme × HudMail",
    preview: "Hi Daniel, thanks for the detailed outline. We'd love to explore a pilot…",
    body: `Hi Daniel,

Thanks for the detailed outline. We'd love to explore a pilot in November. `,
    date: ago(60 * 3),
    folder: "drafts",
    labels: ["work"],
    isRead: true,
    isStarred: false,
  },
  {
    id: "d2",
    senderName: ME.name,
    senderEmail: ME.email,
    to: "",
    subject: "Investor update — October",
    preview: "Highlights: MRR up 22% MoM, 3 enterprise pilots signed, AI compose beta…",
    body: `Highlights:
• MRR up 22% MoM
• 3 enterprise pilots signed
• AI compose beta live`,
    date: ago(60 * 40),
    folder: "drafts",
    labels: ["work"],
    isRead: true,
    isStarred: false,
  },
  // Scheduled
  {
    id: "sc1",
    senderName: ME.name,
    senderEmail: ME.email,
    to: "sofia@northwind.io",
    subject: "Launch day checklist",
    preview: "Morning Sofia! Here's the final checklist for launch day…",
    body: `Morning Sofia! Here's the final checklist for launch day.`,
    date: new Date(Date.now() + 60 * 60 * 18 * 1000).toISOString(),
    folder: "scheduled",
    labels: ["work"],
    isRead: true,
    isStarred: false,
  },
  // Spam
  {
    id: "sp1",
    senderName: "Crypto Wins",
    senderEmail: "win@cryp70-bonus.biz",
    subject: "You've been selected for a 500% bonus!!!",
    preview: "Claim your exclusive reward now before it expires in 2 hours…",
    body: `Claim your exclusive reward now before it expires in 2 hours.`,
    date: ago(60 * 12),
    folder: "spam",
    labels: [],
    isRead: false,
    isStarred: false,
  },
];

export const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: "e1",
    title: "Design sync with Marcus",
    date: dayOffset(0),
    start: "10:00",
    end: "10:30",
    color: "violet",
    location: "Google Meet",
    attendees: ["Marcus Chen"],
  },
  {
    id: "e2",
    title: "Q4 launch review",
    date: dayOffset(0),
    start: "14:00",
    end: "15:00",
    color: "blue",
    location: "Room 4B",
    attendees: ["Sofia Lindqvist", "Priya Raman"],
  },
  {
    id: "e3",
    title: "Acme partnership call",
    date: dayOffset(1),
    start: "11:00",
    end: "11:45",
    color: "emerald",
    location: "Zoom",
    attendees: ["Daniel Okafor"],
  },
  {
    id: "e4",
    title: "Website kickoff — ClientCo",
    date: dayOffset(2),
    start: "10:00",
    end: "11:00",
    color: "amber",
    attendees: ["Jordan Blake"],
  },
  {
    id: "e5",
    title: "Investor update prep",
    date: dayOffset(4),
    start: "16:00",
    end: "17:00",
    color: "rose",
  },
  {
    id: "e6",
    title: "Flight to Lisbon ✈",
    date: dayOffset(9),
    start: "07:30",
    end: "10:15",
    color: "amber",
    location: "SFO → LIS",
  },
  {
    id: "e7",
    title: "1:1 with Priya",
    date: dayOffset(-2),
    start: "09:30",
    end: "10:00",
    color: "blue",
  },
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    title: "AI flagged 2 high-priority emails",
    body: "Sofia (Q4 launch) and Daniel (Acme partnership) need replies.",
    time: "Just now",
    type: "ai",
    read: false,
  },
  {
    id: "n2",
    title: "Meeting in 30 minutes",
    body: "Design sync with Marcus · Google Meet",
    time: "12m ago",
    type: "calendar",
    read: false,
  },
  {
    id: "n3",
    title: "New email from Marcus Chen",
    body: "Moodboard v2 for the mobile redesign",
    time: "46m ago",
    type: "mail",
    read: false,
  },
  {
    id: "n4",
    title: "Storage at 62%",
    body: "Upgrade to Pro for 1 TB and unlimited AI drafts.",
    time: "2h ago",
    type: "system",
    read: true,
  },
];

/** Pool of images used by the "Generate image" AI attachment simulator. */
export const AI_IMAGE_POOL = [IMG.hero, IMG.neon, IMG.cat, IMG.moodboard];

export const SMART_REPLIES: Record<string, string[]> = {
  default: ["Thanks, got it!", "Let me review and get back to you.", "Sounds great — let's do it."],
  m1: ["Approved — ship it 🚀", "Let's keep AI as an add-on.", "Oct 16 works for me."],
  m2: ["Love it! Tomorrow at 2pm?", "Can we try a darker neutral?", "Looks great, approved."],
  m6: [
    "Yes, open to a November pilot.",
    "Let's set up a call next week.",
    "Can you share more details?",
  ],
};

export const TONES = ["Professional", "Friendly", "Concise", "Persuasive", "Formal"] as const;
export type Tone = (typeof TONES)[number];
