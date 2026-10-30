import crypto from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";

// Disable automatic body parsing on Vercel so we can verify the raw Ed25519 signature
export const config = {
  api: {
    bodyParser: false,
  },
};

// Discord Interaction Types
const InteractionType = {
  PING: 1,
  APPLICATION_COMMAND: 2,
  MESSAGE_COMPONENT: 3,
  APPLICATION_COMMAND_AUTOCOMPLETE: 4,
  MODAL_SUBMIT: 5,
};

// Discord Interaction Response Types
const InteractionResponseType = {
  PONG: 1,
  CHANNEL_MESSAGE_WITH_SOURCE: 4,
  DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE: 5,
  DEFERRED_UPDATE_MESSAGE: 6,
  UPDATE_MESSAGE: 7,
  APPLICATION_COMMAND_AUTOCOMPLETE_RESULT: 8,
  MODAL: 9,
};

// Component catalog for /docs and /cli
interface ComponentInfo {
  name: string;
  slug: string;
  category: "core" | "marketing" | "charts";
  description: string;
}

const COMPONENTS: ComponentInfo[] = [
  // Marketing & Motion
  {
    name: "KineticButton",
    slug: "kinetic-button",
    category: "core",
    description: "Magnetic button with kinetic arrow animations and CVA variants.",
  },
  {
    name: "BentoGrid",
    slug: "marketing/bento-grid",
    category: "marketing",
    description: "Asymmetric marketing bento grid with dynamic kinetic cards.",
  },
  {
    name: "Hero Section",
    slug: "marketing/hero",
    category: "marketing",
    description: "High-conversion marketing hero with animated aurora background.",
  },
  {
    name: "SplitTextReveal",
    slug: "split-text-reveal",
    category: "core",
    description: "Typography word and character staggered kinetic reveal animation.",
  },
  {
    name: "StickyStack",
    slug: "sticky-stack",
    category: "core",
    description: "Hardware-accelerated stacking cards on scroll interaction.",
  },
  {
    name: "DoubleBezelCard",
    slug: "double-bezel-card",
    category: "core",
    description: "Dual-border luxury glass card with crosshairs and depth glow.",
  },
  {
    name: "Feature Sections",
    slug: "marketing/feature-sections",
    category: "marketing",
    description: "Alternating feature rows, grid cards, and icon badges.",
  },
  {
    name: "Testimonials",
    slug: "marketing/testimonials",
    category: "marketing",
    description: "Infinite marquee and CSS column masonry customer review blocks.",
  },
  {
    name: "Pricing Section",
    slug: "marketing/pricing",
    category: "marketing",
    description: "Tiered subscription cards with billing cycle toggles and highlight pills.",
  },
  {
    name: "FAQ Section",
    slug: "marketing/faq",
    category: "marketing",
    description: "Fluid accordion questions with smooth Framer Motion transitions.",
  },

  // Core Primitives
  {
    name: "Button",
    slug: "button",
    category: "core",
    description: "Accessible button with solid, soft, flat, and outline variants.",
  },
  {
    name: "Card",
    slug: "card",
    category: "core",
    description: "Structured card with CardHeader, CardBody, and CardFooter.",
  },
  {
    name: "Dialog / Modal",
    slug: "dialog",
    category: "core",
    description: "Accessible dialog overlay with focus trap and spring animations.",
  },
  {
    name: "Dropdown",
    slug: "dropdown",
    category: "core",
    description: "Floating action menu with trigger, menu items, and keyboard navigation.",
  },
  {
    name: "Input",
    slug: "input",
    category: "core",
    description: "Text input with prefix/suffix icons, helper text, and validation states.",
  },
  {
    name: "InputOTP",
    slug: "input-otp",
    category: "core",
    description: "Accessible one-time password segmented verification input.",
  },
  {
    name: "Tabs",
    slug: "tabs",
    category: "core",
    description: "Animated pill and underline tab switches with active layoutId indicator.",
  },
  {
    name: "Badge",
    slug: "badge",
    category: "core",
    description: "Compact status indicator with soft, solid, and outline variants.",
  },
  {
    name: "Accordion",
    slug: "accordion",
    category: "core",
    description: "Collapsible accordion panel group with multi-expand support.",
  },
  {
    name: "Select",
    slug: "select",
    category: "core",
    description: "Accessible custom select dropdown with search and option groups.",
  },
  {
    name: "Table",
    slug: "table",
    category: "core",
    description: "Data table with sortable columns, pagination, and striped rows.",
  },
  {
    name: "Sidebar",
    slug: "sidebar",
    category: "core",
    description: "Responsive collapsible desktop and mobile navigation sidebar.",
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    category: "core",
    description: "Floating context label with micro-spring entry and pointer arrow.",
  },

  // Charts
  {
    name: "AreaChart",
    slug: "area-chart",
    category: "charts",
    description: "Smooth gradient area chart with interactive tooltip and responsive container.",
  },
  {
    name: "BarChart",
    slug: "bar-chart",
    category: "charts",
    description: "Vertical and horizontal bar charts with multi-category metrics.",
  },
  {
    name: "LineChart",
    slug: "line-chart",
    category: "charts",
    description: "Multi-series line chart with customizable strokes and active dots.",
  },
  {
    name: "PieChart",
    slug: "pie-chart",
    category: "charts",
    description: "Donut and pie chart with percentage breakdown and legends.",
  },
];

interface DiscordOption {
  name: string;
  value?: unknown;
  focused?: boolean;
}

// Helper: read raw body from request stream
async function getRawBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

// Helper: verify Discord Ed25519 signature
function verifyDiscordSignature({
  rawBody,
  signature,
  timestamp,
  publicKeyHex,
}: {
  rawBody: string;
  signature: string;
  timestamp: string;
  publicKeyHex: string;
}): boolean {
  try {
    const spkiPrefix = Buffer.from("302a300506032b6570032100", "hex");
    const key = crypto.createPublicKey({
      key: Buffer.concat([spkiPrefix, Buffer.from(publicKeyHex, "hex")]),
      format: "der",
      type: "spki",
    });
    const message = Buffer.from(timestamp + rawBody);
    const sig = Buffer.from(signature, "hex");
    return crypto.verify(null, message, key, sig);
  } catch {
    return false;
  }
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const signature = req.headers["x-signature-ed25519"] as string;
  const timestamp = req.headers["x-signature-timestamp"] as string;
  const publicKeyHex = process.env.DISCORD_PUBLIC_KEY;

  if (!signature || !timestamp || !publicKeyHex) {
    res.statusCode = 401;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Missing signature or DISCORD_PUBLIC_KEY" }));
    return;
  }

  const rawBody = await getRawBody(req);
  const isValid = verifyDiscordSignature({
    rawBody,
    signature,
    timestamp,
    publicKeyHex,
  });

  if (!isValid) {
    res.statusCode = 401;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Invalid request signature" }));
    return;
  }

  const interaction = JSON.parse(rawBody);

  // 1. PING from Discord (Webhook verification handshake)
  if (interaction.type === InteractionType.PING) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ type: InteractionResponseType.PONG }));
    return;
  }

  // 2. AUTOCOMPLETE handler for slash commands
  if (interaction.type === InteractionType.APPLICATION_COMMAND_AUTOCOMPLETE) {
    const focusedOption = interaction.data?.options?.find((opt: DiscordOption) => opt.focused);
    const query = (focusedOption?.value || "").toString().toLowerCase();

    const matches = COMPONENTS.filter(
      (c) => c.name.toLowerCase().includes(query) || c.slug.toLowerCase().includes(query)
    ).slice(0, 15);

    const choices = matches.map((c) => ({
      name: `${c.name} (${c.category})`,
      value: c.slug,
    }));

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        type: InteractionResponseType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
        data: { choices },
      })
    );
    return;
  }

  // 3. APPLICATION COMMAND execution
  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    const { name, options = [] } = interaction.data;
    const optionMap = new Map<string, unknown>(
      options.map((o: DiscordOption) => [o.name, o.value])
    );

    // ── Command: /docs ──
    if (name === "docs") {
      const compSlug = optionMap.get("component") as string | undefined;
      const matched = compSlug
        ? COMPONENTS.find(
            (c) =>
              c.slug.toLowerCase() === compSlug.toLowerCase() ||
              c.name.toLowerCase() === compSlug.toLowerCase()
          )
        : null;

      if (matched) {
        const docUrl = `https://hudbird.vercel.app/#/${matched.slug}`;
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              embeds: [
                {
                  title: `🦅 ${matched.name}`,
                  url: docUrl,
                  description: matched.description,
                  color: 0x6366f1, // Indigo
                  fields: [
                    {
                      name: "📦 Quick Install (CLI)",
                      value: `\`\`\`bash\nnpx hudbird-ui add ${matched.slug.replace("marketing/", "")}\n\`\`\``,
                    },
                    {
                      name: "📚 Full Documentation & Interactive Sandbox",
                      value: `[View ${matched.name} on Hudbird UI Docs](${docUrl})`,
                    },
                  ],
                  footer: { text: "Hudbird UI — Fly through your development" },
                },
              ],
            },
          })
        );
        return;
      }

      // Default /docs
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            embeds: [
              {
                title: "🦅 Hudbird UI Documentation",
                url: "https://hudbird.vercel.app",
                description:
                  "A premium, featherweight React UI & Kinetic Motion Component Library built with Tailwind CSS v4 and Framer Motion.",
                color: 0x3b82f6, // Blue
                fields: [
                  {
                    name: "🚀 Getting Started",
                    value:
                      "• [Installation Guide](https://hudbird.vercel.app/#/installation)\n• [CLI Commands](https://hudbird.vercel.app/#/cli)\n• [AI Skills Integration](https://hudbird.vercel.app/#/ai-skills)",
                  },
                  {
                    name: "✨ Featured Kinetic Components",
                    value:
                      "• [KineticButton](https://hudbird.vercel.app/#/kinetic-button)\n• [BentoGrid](https://hudbird.vercel.app/#/marketing/bento-grid)\n• [DoubleBezelCard](https://hudbird.vercel.app/#/double-bezel-card)\n• [SplitTextReveal](https://hudbird.vercel.app/#/split-text-reveal)",
                  },
                ],
                footer: { text: "Tip: Use /docs <component> to look up specific components!" },
              },
            ],
          },
        })
      );
      return;
    }

    // ── Command: /cli ──
    if (name === "cli") {
      const compSlug = optionMap.get("component") as string | undefined;
      const cleanSlug = compSlug ? compSlug.replace("marketing/", "") : "[component-name]";

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            embeds: [
              {
                title: "💻 Hudbird UI CLI Quickstart",
                url: "https://hudbird.vercel.app/#/cli",
                description:
                  "Scaffold primitives, marketing sections, and themes directly into your project.",
                color: 0x10b981, // Emerald
                fields: [
                  {
                    name: "1. Initialize Project",
                    value: "```bash\nnpx hudbird-ui init\n```",
                  },
                  {
                    name: "2. Add Component",
                    value: `\`\`\`bash\nnpx hudbird-ui add ${cleanSlug}\n\`\`\``,
                  },
                  {
                    name: "3. Check Upstream Updates & Diffs",
                    value: "```bash\nnpx hudbird-ui diff\n```",
                  },
                ],
                footer: { text: "Hudbird CLI — Zero configuration component scaffolding" },
              },
            ],
          },
        })
      );
      return;
    }

    // ── Command: /skill ──
    if (name === "skill") {
      const platform = String(optionMap.get("platform") || "all").toLowerCase();

      let targetInstructions: string;
      if (platform === "claude") {
        targetInstructions =
          "**Claude Code CLI**:\n```bash\ncurl -sSL https://raw.githubusercontent.com/gpamdani-git/Hudbird/main/.agents/skills/hudbird-ui/SKILL.md -o ~/.claude/skills/hudbird-ui.md\n```";
      } else if (platform === "antigravity") {
        targetInstructions =
          "**Google Antigravity**:\n```bash\ncurl -sSL https://raw.githubusercontent.com/gpamdani-git/Hudbird/main/.agents/skills/hudbird-ui/SKILL.md -o .agents/skills/hudbird-ui/SKILL.md\n```";
      } else if (platform === "cursor") {
        targetInstructions =
          "**Cursor IDE**:\nSave the skill markdown file into `.cursor/rules/hudbird-ui.mdc` or project `.agents/skills/`";
      } else {
        targetInstructions =
          "Run this in any project to equip your AI agent:\n```bash\ncurl -sSL https://raw.githubusercontent.com/gpamdani-git/Hudbird/main/.agents/skills/hudbird-ui/SKILL.md -o .agents/skills/hudbird-ui/SKILL.md\n```";
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            embeds: [
              {
                title: "🤖 Hudbird UI AI Skill (Zero-Hallucination)",
                url: "https://hudbird.vercel.app/#/ai-skills",
                description:
                  "Empower your coding AI (Claude Code, Google Antigravity, Cursor, Codex) with 100% accurate props, 8 vertical niche blocks, and automated dark mode!",
                color: 0x8b5cf6, // Purple
                fields: [
                  {
                    name: "⚡ 1-Line Setup",
                    value: targetInstructions,
                  },
                  {
                    name: "🎯 Key Superpowers",
                    value:
                      "• **10x Velocity**: Zero docs switching\n• **Zero Hallucination**: Locks model to authentic CVA variants\n• **Auto Dark Mode**: Guaranteed paired Tailwind classes\n• **Kinetic Motion**: KineticButton, SplitTextReveal, StickyStack ready",
                  },
                  {
                    name: "📖 Full Tutorial & Battle-Tested Prompts",
                    value: "[Open AI Skills Documentation](https://hudbird.vercel.app/#/ai-skills)",
                  },
                ],
                footer: { text: "Hudbird AI Skills — Build UI in seconds" },
              },
            ],
          },
        })
      );
      return;
    }

    // ── Command: /community ──
    if (name === "community") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            embeds: [
              {
                title: "🦅 Hudbird UI Community Hub",
                color: 0x06b6d4, // Cyan
                fields: [
                  { name: "🌐 Website & Docs", value: "https://hudbird.vercel.app" },
                  {
                    name: "🐙 GitHub Repository",
                    value: "https://github.com/gpamdani-git/Hudbird",
                  },
                  { name: "💬 Discord Server", value: "https://discord.gg/NPBspwkXke" },
                  {
                    name: "📦 NPM Registry",
                    value:
                      "[@hudbird/ui](https://npmjs.com/package/@hudbird/ui) • [@hudbird/marketing](https://npmjs.com/package/@hudbird/marketing)",
                  },
                ],
              },
            ],
          },
        })
      );
      return;
    }
  }

  // Fallback
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ error: "Unknown interaction" }));
}
