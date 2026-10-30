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

// Complete component catalog across Core, Marketing, Charts, and Layouts
interface ComponentInfo {
  name: string;
  slug: string;
  category: "core" | "marketing" | "charts" | "layouts";
  description: string;
}

const COMPONENTS: ComponentInfo[] = [
  // ── Kinetic & Motion Highlights ──
  {
    name: "KineticButton",
    slug: "kinetic-button",
    category: "core",
    description: "Magnetic button with kinetic arrow animations and CVA variants.",
  },
  {
    name: "DoubleBezelCard",
    slug: "double-bezel-card",
    category: "core",
    description: "Dual-border luxury glass card with crosshairs and depth glow.",
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

  // ── Core UI Primitives ──
  {
    name: "Accordion",
    slug: "accordion",
    category: "core",
    description: "Collapsible accordion panel group with multi-expand and spring motion.",
  },
  {
    name: "Alert",
    slug: "alert",
    category: "core",
    description: "Feedback banners with status colors, icons, and dismissible actions.",
  },
  {
    name: "Avatar",
    slug: "avatar",
    category: "core",
    description: "User profile image with fallback initials and status indicators.",
  },
  {
    name: "Badge",
    slug: "badge",
    category: "core",
    description: "Compact status indicator with soft, solid, and outline variants.",
  },
  {
    name: "Breadcrumbs",
    slug: "breadcrumbs",
    category: "core",
    description: "Hierarchical path navigation with separator customization.",
  },
  {
    name: "Button",
    slug: "button",
    category: "core",
    description: "Accessible button with solid, soft, flat, and outline variants.",
  },
  {
    name: "Calendar",
    slug: "calendar",
    category: "core",
    description: "Accessible date picker & range selection calendar.",
  },
  {
    name: "Card",
    slug: "card",
    category: "core",
    description: "Structured card with CardHeader, CardBody, and CardFooter.",
  },
  {
    name: "Checkbox",
    slug: "checkbox",
    category: "core",
    description: "Accessible controlled checkbox with indeterminate state support.",
  },
  {
    name: "Combobox",
    slug: "combobox",
    category: "core",
    description: "Searchable autocomplete dropdown with filtered option lists.",
  },
  {
    name: "Command",
    slug: "command",
    category: "core",
    description: "Fast command palette dialog with keyboard navigation (cmd+k).",
  },
  {
    name: "DescriptionList",
    slug: "description-list",
    category: "core",
    description: "Key-value pair metadata layout for clean profile & detail views.",
  },
  {
    name: "Dialog",
    slug: "dialog",
    category: "core",
    description: "Modal dialog overlay with focus trap and backdrop blur.",
  },
  {
    name: "Divider",
    slug: "divider",
    category: "core",
    description: "Horizontal or vertical separator line with optional text label.",
  },
  {
    name: "Dropdown",
    slug: "dropdown",
    category: "core",
    description: "Floating action menu with trigger, menu items, and keyboard navigation.",
  },
  {
    name: "EditorialImage",
    slug: "editorial-image",
    category: "core",
    description: "Art-directed responsive image container with grain overlays.",
  },
  {
    name: "Fieldset",
    slug: "fieldset",
    category: "core",
    description: "Grouped form controls with legend and validation error messaging.",
  },
  {
    name: "Form",
    slug: "form",
    category: "core",
    description: "Accessible form wrapper with validation state management.",
  },
  {
    name: "Heading",
    slug: "heading",
    category: "core",
    description: "Typography display and title elements with responsive sizing.",
  },
  {
    name: "IconBox",
    slug: "icon-box",
    category: "core",
    description: "Styled geometric wrapper for iconography and badges.",
  },
  {
    name: "InfiniteScroll",
    slug: "infinite-scroll",
    category: "core",
    description: "Virtualized infinite feed loader for high-performance long lists.",
  },
  {
    name: "Input",
    slug: "input",
    category: "core",
    description: "Form text input with prefix/suffix icons, helper text, and validation states.",
  },
  {
    name: "InputOTP",
    slug: "input-otp",
    category: "core",
    description: "Accessible one-time password segmented verification input.",
  },
  {
    name: "Navbar",
    slug: "navbar",
    category: "core",
    description: "Sticky responsive navigation header with brand and action items.",
  },
  {
    name: "Pagination",
    slug: "pagination",
    category: "core",
    description: "Multi-page navigation controls with range ellipsis.",
  },
  {
    name: "Popover",
    slug: "popover",
    category: "core",
    description: "Floating content popover anchored to trigger button.",
  },
  {
    name: "Progress",
    slug: "progress",
    category: "core",
    description: "Linear and circular progress indicators with smooth animations.",
  },
  {
    name: "RadioGroup",
    slug: "radio-group",
    category: "core",
    description: "Single-selection option list with accessible keyboard controls.",
  },
  {
    name: "Select",
    slug: "select",
    category: "core",
    description: "Accessible custom select dropdown with search and option groups.",
  },
  {
    name: "Sheet",
    slug: "sheet",
    category: "core",
    description: "Slide-out side drawer from top, right, bottom, or left.",
  },
  {
    name: "Sidebar",
    slug: "sidebar",
    category: "core",
    description: "Responsive collapsible desktop and mobile navigation sidebar.",
  },
  {
    name: "Skeleton",
    slug: "skeleton",
    category: "core",
    description: "Pulsing placeholder for component loading states.",
  },
  {
    name: "Slider",
    slug: "slider",
    category: "core",
    description: "Range slider input with thumb tooltip and tick marks.",
  },
  {
    name: "Switch",
    slug: "switch",
    category: "core",
    description: "Accessible toggle switch with smooth spring thumb motion.",
  },
  {
    name: "Table",
    slug: "table",
    category: "core",
    description: "Data table with sortable columns, pagination, and striped rows.",
  },
  {
    name: "Tabs",
    slug: "tabs",
    category: "core",
    description: "Animated pill and underline tab switches with active layoutId indicator.",
  },
  {
    name: "Text",
    slug: "text",
    category: "core",
    description: "Paragraph, muted, and inline typography primitives.",
  },
  {
    name: "Textarea",
    slug: "textarea",
    category: "core",
    description: "Multi-line text input with auto-resize capability.",
  },
  {
    name: "Toast",
    slug: "toast",
    category: "core",
    description: "Floating notification toasts with action buttons and timers.",
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    category: "core",
    description: "Floating micro-spring tooltip with arrow anchor.",
  },

  // ── Marketing Sections ──
  {
    name: "Hero Section",
    slug: "marketing/hero",
    category: "marketing",
    description: "High-conversion marketing hero with animated aurora background.",
  },
  {
    name: "BentoGrid",
    slug: "marketing/bento-grid",
    category: "marketing",
    description: "Asymmetric marketing bento grid with dynamic kinetic cards.",
  },
  {
    name: "Logo Clouds",
    slug: "marketing/logo-clouds",
    category: "marketing",
    description: "Partner & customer brand logo ticker with smooth marquee animation.",
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
  {
    name: "Call to Action",
    slug: "marketing/cta",
    category: "marketing",
    description: "High-impact conversion banner with primary & secondary buttons.",
  },
  {
    name: "Footer",
    slug: "marketing/footer",
    category: "marketing",
    description: "Mega footer with multi-column links, newsletter, and socials.",
  },

  // ── Charts ──
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
  {
    name: "ComposedChart",
    slug: "composed-chart",
    category: "charts",
    description: "Combined bar, line, and area chart for multi-metric comparison.",
  },
  {
    name: "RadarChart",
    slug: "radar-chart",
    category: "charts",
    description: "Multivariate radial radar chart for dimensional score analysis.",
  },
  {
    name: "RadialChart",
    slug: "radial-chart",
    category: "charts",
    description: "Circular gauge and multi-ring radial progress chart.",
  },
  {
    name: "ChartTooltip",
    slug: "chart-tooltip",
    category: "charts",
    description: "Custom styled chart hover tooltip with indicators and values.",
  },

  // ── Layouts ──
  {
    name: "Sidebar Layout",
    slug: "layouts/sidebar",
    category: "layouts",
    description: "Complete modern dashboard layout with responsive sidebar and top bar.",
  },
  {
    name: "Stacked Layout",
    slug: "layouts/stacked",
    category: "layouts",
    description: "Full-width application layout with horizontal top navigation.",
  },
  {
    name: "Auth Layout",
    slug: "layouts/auth",
    category: "layouts",
    description: "Split-screen and centered sign-in / registration auth layout.",
  },
];

interface DiscordOption {
  name: string;
  value?: unknown;
  focused?: boolean;
}

// Helper: read raw body from request stream or parsed body
async function getRawBody(req: IncomingMessage): Promise<string> {
  const anyReq = req as unknown as { rawBody?: unknown; body?: unknown };
  if (anyReq.rawBody) {
    return typeof anyReq.rawBody === "string"
      ? anyReq.rawBody
      : Buffer.isBuffer(anyReq.rawBody)
        ? anyReq.rawBody.toString("utf8")
        : JSON.stringify(anyReq.rawBody);
  }

  if (typeof anyReq.body === "string") return anyReq.body;
  if (Buffer.isBuffer(anyReq.body)) return anyReq.body.toString("utf8");

  try {
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }
    const fromStream = Buffer.concat(chunks).toString("utf8");
    if (fromStream.length > 0) return fromStream;
  } catch {
    // Stream may already be closed/consumed
  }

  if (anyReq.body && typeof anyReq.body === "object") {
    return JSON.stringify(anyReq.body);
  }

  return "";
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
    const cleanKey = publicKeyHex.trim();
    const cleanSig = signature.trim();
    const cleanTimestamp = timestamp.trim();

    if (cleanKey.length !== 64 || cleanSig.length !== 128) {
      return false;
    }

    const spkiPrefix = Buffer.from("302a300506032b6570032100", "hex");
    const key = crypto.createPublicKey({
      key: Buffer.concat([spkiPrefix, Buffer.from(cleanKey, "hex")]),
      format: "der",
      type: "spki",
    });
    const message = Buffer.from(cleanTimestamp + rawBody);
    const sig = Buffer.from(cleanSig, "hex");
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
    const query = (focusedOption?.value || "").toString().toLowerCase().trim();

    const matches = COMPONENTS.filter(
      (c) => c.name.toLowerCase().includes(query) || c.slug.toLowerCase().includes(query)
    ).slice(0, 25);

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
        const cliName = matched.slug.replace("marketing/", "").replace("layouts/", "");
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              embeds: [
                {
                  title: `🦅 ${matched.name} (${matched.category.toUpperCase()})`,
                  url: docUrl,
                  description: matched.description,
                  color: 0x6366f1, // Indigo
                  fields: [
                    {
                      name: "📦 Quick Install (CLI)",
                      value: `\`\`\`bash\nnpx hudbird-ui add ${cliName}\n\`\`\``,
                    },
                    {
                      name: "📚 Full Documentation & Interactive Sandbox",
                      value: `[Open ${matched.name} Documentation](${docUrl})`,
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

      // Default /docs overview
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            embeds: [
              {
                title: "🦅 Hudbird UI Documentation & Components",
                url: "https://hudbird.vercel.app",
                description:
                  "A premium, featherweight React UI & Kinetic Motion Component Library built with Tailwind CSS v4 and Framer Motion.\n\nExplore **70+ primitives, marketing sections, charts, and layouts**:",
                color: 0x3b82f6, // Blue
                fields: [
                  {
                    name: "⚛️ Core Primitives (40+ Components)",
                    value:
                      "`Button`, `Card`, `Dialog`, `Dropdown`, `Input`, `Select`, `Tabs`, `Table`, `Accordion`, `InputOTP`, `Combobox`, `Calendar`, `Breadcrumbs`, `Sheet`, `Popover`, `Progress`, `RadioGroup`, `Skeleton`, `Slider`, `Switch`, `Toast`, `Tooltip`...",
                  },
                  {
                    name: "🚀 Marketing & Kinetic Sections (9 Blocks)",
                    value:
                      "• [KineticButton](https://hudbird.vercel.app/#/kinetic-button) & [DoubleBezelCard](https://hudbird.vercel.app/#/double-bezel-card)\n• [SplitTextReveal](https://hudbird.vercel.app/#/split-text-reveal) & [StickyStack](https://hudbird.vercel.app/#/sticky-stack)\n• [Hero Section](https://hudbird.vercel.app/#/marketing/hero) & [BentoGrid](https://hudbird.vercel.app/#/marketing/bento-grid)\n• [Pricing](https://hudbird.vercel.app/#/marketing/pricing) & [Testimonials](https://hudbird.vercel.app/#/marketing/testimonials)",
                  },
                  {
                    name: "📊 Interactive Charts (8 Types)",
                    value:
                      "`AreaChart`, `BarChart`, `LineChart`, `PieChart`, `ComposedChart`, `RadarChart`, `RadialChart`, `ChartTooltip`",
                  },
                  {
                    name: "💡 Look Up Any Component Instantly",
                    value:
                      "Type `/docs component:` and start typing any component name to open its exact docs and CLI install code!",
                  },
                ],
                footer: { text: "Hudbird UI — https://hudbird.vercel.app" },
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
      const cleanSlug = compSlug
        ? compSlug.replace("marketing/", "").replace("layouts/", "")
        : "[component-name]";

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
