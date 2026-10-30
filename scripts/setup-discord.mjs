#!/usr/bin/env node

/**
 * Hudbird UI - Discord Community Setup & Security Script
 * Configures categories, channels, topics, security permission overwrites,
 * and initial welcome messages via Discord REST API.
 *
 * Security Model:
 *  - 🔒 READ_ONLY channels: #welcome, #announcements, #rules, #official-links
 *      -> @everyone can view, read history, and react with emoji, but CANNOT chat or make threads.
 *  - 💬 INTERACTIVE channels: #general, #feedback, #components-help, #ai-and-skills, #bug-reports, #feature-requests, #contributing, #design-taste
 *      -> @everyone can chat, attach files, embed links, but CANNOT @everyone / @here spam.
 *  - 📸 SHOWCASE channel: #showcase
 *      -> optimized for screenshots, live demo links, and discussions with no @everyone spam.
 *  - 🔊 VOICE channels: Lounge & Pair Programming
 *      -> @everyone can connect, speak, stream/screen-share with VAD.
 *
 * Usage:
 *   DISCORD_BOT_TOKEN="your_token" DISCORD_GUILD_ID="your_server_id" node scripts/setup-discord.mjs
 *   or via .env.local:
 *   DISCORD_BOT_TOKEN=...
 *   DISCORD_GUILD_ID=...
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// Helper to load .env or .env.local if present
function loadEnv() {
  const envFiles = [".env.local", ".env"];
  for (const file of envFiles) {
    const fullPath = resolve(process.cwd(), file);
    if (existsSync(fullPath)) {
      const content = readFileSync(fullPath, "utf8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const [key, ...values] = trimmed.split("=");
          const val = values
            .join("=")
            .trim()
            .replace(/^["'](.*)["']$/, "$1");
          if (!process.env[key.trim()]) {
            process.env[key.trim()] = val;
          }
        }
      }
    }
  }
}

loadEnv();

const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || process.argv[2];
const GUILD_ID = process.env.DISCORD_GUILD_ID || process.argv[3];

if (!BOT_TOKEN || !GUILD_ID) {
  console.error(`\x1b[31m[Error] Missing credentials!\x1b[0m`);
  console.log(`
Please provide DISCORD_BOT_TOKEN and DISCORD_GUILD_ID.

Options:
1. Run directly with environment variables:
   \x1b[36mDISCORD_BOT_TOKEN="your_token" DISCORD_GUILD_ID="your_server_id" node scripts/setup-discord.mjs\x1b[0m

2. Or add them to \x1b[33m.env.local\x1b[0m (already gitignored):
   DISCORD_BOT_TOKEN=your_token
   DISCORD_GUILD_ID=your_server_id
   Then run: \x1b[36mnode scripts/setup-discord.mjs\x1b[0m
`);
  process.exit(1);
}

const API_BASE = "https://discord.com/api/v10";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function discordFetch(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bot ${BOT_TOKEN}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(
      `Discord API Error [${res.status} ${res.statusText}] at ${endpoint}: ${errorBody}`
    );
  }

  // Rate-limiting delay safety
  await sleep(400);

  if (res.status === 204) return null;
  return res.json();
}

// Discord Permission Bitwise Flags (BigInt)
const PERMS = {
  CREATE_INSTANT_INVITE: 1n << 0n,
  ADD_REACTIONS: 1n << 6n,
  STREAM: 1n << 9n,
  VIEW_CHANNEL: 1n << 10n,
  SEND_MESSAGES: 1n << 11n,
  SEND_TTS_MESSAGES: 1n << 12n,
  MANAGE_MESSAGES: 1n << 13n,
  EMBED_LINKS: 1n << 14n,
  ATTACH_FILES: 1n << 15n,
  READ_MESSAGE_HISTORY: 1n << 16n,
  MENTION_EVERYONE: 1n << 17n,
  USE_EXTERNAL_EMOJIS: 1n << 18n,
  CONNECT: 1n << 20n,
  SPEAK: 1n << 21n,
  USE_VAD: 1n << 25n,
  CREATE_PUBLIC_THREADS: 1n << 35n,
  CREATE_PRIVATE_THREADS: 1n << 36n,
  SEND_MESSAGES_IN_THREADS: 1n << 38n,
};

// Generates permission overwrite for @everyone (id = guild_id)
function createOverwrites(profile, guildId) {
  if (profile === "READ_ONLY") {
    return [
      {
        id: guildId,
        type: 0, // Role
        allow: (
          PERMS.VIEW_CHANNEL |
          PERMS.READ_MESSAGE_HISTORY |
          PERMS.ADD_REACTIONS
        ).toString(),
        deny: (
          PERMS.SEND_MESSAGES |
          PERMS.SEND_MESSAGES_IN_THREADS |
          PERMS.CREATE_PUBLIC_THREADS |
          PERMS.CREATE_PRIVATE_THREADS |
          PERMS.MENTION_EVERYONE |
          PERMS.SEND_TTS_MESSAGES
        ).toString(),
      },
    ];
  }

  if (profile === "INTERACTIVE" || profile === "SHOWCASE") {
    return [
      {
        id: guildId,
        type: 0,
        allow: (
          PERMS.VIEW_CHANNEL |
          PERMS.SEND_MESSAGES |
          PERMS.READ_MESSAGE_HISTORY |
          PERMS.EMBED_LINKS |
          PERMS.ATTACH_FILES |
          PERMS.ADD_REACTIONS |
          PERMS.USE_EXTERNAL_EMOJIS |
          PERMS.CREATE_PUBLIC_THREADS |
          PERMS.SEND_MESSAGES_IN_THREADS
        ).toString(),
        deny: (
          PERMS.MENTION_EVERYONE |
          PERMS.SEND_TTS_MESSAGES |
          PERMS.CREATE_PRIVATE_THREADS
        ).toString(),
      },
    ];
  }

  if (profile === "VOICE") {
    return [
      {
        id: guildId,
        type: 0,
        allow: (
          PERMS.VIEW_CHANNEL |
          PERMS.CONNECT |
          PERMS.SPEAK |
          PERMS.STREAM |
          PERMS.USE_VAD
        ).toString(),
        deny: (PERMS.MENTION_EVERYONE).toString(),
      },
    ];
  }

  return [];
}

const STRUCTURE = [
  {
    category: "📢 WELCOME & INFO",
    channels: [
      {
        name: "welcome",
        type: 0, // Guild Text
        profile: "READ_ONLY",
        topic: "Welcome to Hudbird UI Community! Introduce yourself & check our resources.",
        initialMessage: {
          content: "🎉 **Welcome to the Official Hudbird UI Community!**",
          embeds: [
            {
              title: "🦅 Welcome to Hudbird UI",
              description:
                "**Hudbird UI** is a premium, featherweight React UI & Kinetic Motion Component Library designed for speed, beauty, and AI-assisted workflows.\n\nWhether you are building SaaS apps, fintech dashboards, or innovative landing pages, you are in the right place!",
              color: 0x6366f1, // Indigo
              fields: [
                {
                  name: "🚀 Quickstart",
                  value:
                    "Check out [Documentation](https://hudbird.vercel.app) or run `npx hudbird-ui init` in your project.",
                },
                {
                  name: "🤖 AI Superpowers",
                  value:
                    "Add the official Hudbird UI skill to Claude Code, Antigravity, or Codex for zero-hallucination UI generation!",
                },
                {
                  name: "👋 Join the Discussion",
                  value:
                    "Head over to #general or #components-help to start chatting and exploring!",
                },
              ],
              footer: { text: "Hudbird UI — Fly through your development" },
            },
          ],
        },
      },
      {
        name: "announcements",
        type: 0,
        profile: "READ_ONLY",
        topic: "Latest releases, package updates, and news for Hudbird UI.",
      },
      {
        name: "rules",
        type: 0,
        profile: "READ_ONLY",
        topic: "Community guidelines and code of conduct.",
        initialMessage: {
          content: "📜 **Hudbird UI Community Guidelines**",
          embeds: [
            {
              title: "Community Code of Conduct",
              description:
                "We strive to build a welcoming, helpful, and inspiring environment for all developers and creators.",
              color: 0x10b981, // Emerald
              fields: [
                {
                  name: "1. Be Respectful & Kind",
                  value:
                    "Treat everyone with respect. Harassment, hate speech, or derogatory comments will result in an immediate ban.",
                },
                {
                  name: "2. Keep Discussions in Relevant Channels",
                  value:
                    "Use `#components-help` for component issues, `#showcase` to share your work, and `#ai-and-skills` for LLM discussions.",
                },
                {
                  name: "3. No Spam or Self-Promotion Without Context",
                  value:
                    "Do not send unsolicited DMs or spam links. Relevant project showcases belong in `#showcase`.",
                },
                {
                  name: "4. Constructive Collaboration",
                  value:
                    "Offer constructive feedback. When asking for help, provide minimal reproducible code and context.",
                },
              ],
            },
          ],
        },
      },
      {
        name: "official-links",
        type: 0,
        profile: "READ_ONLY",
        topic: "Official websites, repositories, package registry, and docs.",
        initialMessage: {
          content: "🔗 **Official Hudbird UI Resources**",
          embeds: [
            {
              title: "Essential Links",
              color: 0x06b6d4, // Cyan
              fields: [
                {
                  name: "🌐 Documentation & Showcase",
                  value: "https://hudbird.vercel.app",
                },
                {
                  name: "🐙 GitHub Repository",
                  value: "https://github.com/gpamdani-git/Hudbird",
                },
                {
                  name: "📦 NPM Packages",
                  value:
                    "[@hudbird/ui](https://npmjs.com/package/@hudbird/ui) & [@hudbird/marketing](https://npmjs.com/package/@hudbird/marketing)",
                },
                {
                  name: "🤖 AI Skill Guide",
                  value: "https://hudbird.vercel.app/#/ai-skills",
                },
              ],
            },
          ],
        },
      },
    ],
  },
  {
    category: "💬 COMMUNITY",
    channels: [
      {
        name: "general",
        type: 0,
        profile: "INTERACTIVE",
        topic: "General chat about web development, frontend architecture, and design.",
      },
      {
        name: "showcase",
        type: 0,
        profile: "SHOWCASE",
        topic: "Show off what you have built using Hudbird UI! Links & screenshots welcome.",
      },
      {
        name: "feedback",
        type: 0,
        profile: "INTERACTIVE",
        topic: "Share feedback, UX ideas, and impressions of Hudbird UI.",
      },
    ],
  },
  {
    category: "🛠️ DEVELOPMENT & HELP",
    channels: [
      {
        name: "components-help",
        type: 0,
        profile: "INTERACTIVE",
        topic: "Questions and troubleshooting for @hudbird/ui, @hudbird/marketing, and Tailwind.",
      },
      {
        name: "ai-and-skills",
        type: 0,
        profile: "INTERACTIVE",
        topic: "Building with Hudbird AI Skills in Claude Code, Antigravity, Cursor, and Codex.",
      },
      {
        name: "bug-reports",
        type: 0,
        profile: "INTERACTIVE",
        topic: "Report bugs or unexpected component behavior before filing on GitHub.",
      },
      {
        name: "feature-requests",
        type: 0,
        profile: "INTERACTIVE",
        topic: "Suggest new components, kinetic animations, and marketing blocks.",
      },
    ],
  },
  {
    category: "🚀 CONTRIBUTORS",
    channels: [
      {
        name: "contributing",
        type: 0,
        profile: "INTERACTIVE",
        topic: "Monorepo development, pull requests, RFCs, and package publishing.",
      },
      {
        name: "design-taste",
        type: 0,
        profile: "INTERACTIVE",
        topic: "Kinetic animations, tokens, aesthetic directions, and visual benchmarks.",
      },
    ],
  },
  {
    category: "🔊 VOICE LOUNGES",
    channels: [
      {
        name: "Community Lounge",
        type: 2, // Guild Voice
        profile: "VOICE",
      },
      {
        name: "Pair Programming",
        type: 2, // Guild Voice
        profile: "VOICE",
      },
    ],
  },
];

async function run() {
  console.log(
    `\x1b[36m[Hudbird Discord Setup & Security]\x1b[0m Connecting to Discord Guild ID: ${GUILD_ID}...`
  );

  // 1. Verify guild access
  const guild = await discordFetch(`/guilds/${GUILD_ID}`);
  console.log(`\x1b[32m✔ Connected to server:\x1b[0m "${guild.name}" (${guild.id})`);

  // 2. Fetch existing channels
  const existingChannels = await discordFetch(`/guilds/${GUILD_ID}/channels`);
  console.log(`ℹ Found ${existingChannels.length} existing channel(s).`);

  const channelMap = new Map(existingChannels.map((c) => [c.name.toLowerCase(), c]));

  for (const cat of STRUCTURE) {
    let categoryChannel = channelMap.get(cat.category.toLowerCase());

    if (!categoryChannel || categoryChannel.type !== 4) {
      console.log(`\x1b[35m[Category]\x1b[0m Creating "${cat.category}"...`);
      categoryChannel = await discordFetch(`/guilds/${GUILD_ID}/channels`, {
        method: "POST",
        body: JSON.stringify({
          name: cat.category,
          type: 4, // GUILD_CATEGORY
        }),
      });
      channelMap.set(categoryChannel.name.toLowerCase(), categoryChannel);
    } else {
      console.log(
        `\x1b[90m[Category]\x1b[0m "${cat.category}" verified (ID: ${categoryChannel.id}).`
      );
    }

    for (const ch of cat.channels) {
      const overwrites = createOverwrites(ch.profile, GUILD_ID);
      let existing = channelMap.get(ch.name.toLowerCase());
      let targetChannelId = existing?.id;

      if (!existing) {
        console.log(`  \x1b[34m[Channel]\x1b[0m Creating #${ch.name} (Security: ${ch.profile})...`);
        const created = await discordFetch(`/guilds/${GUILD_ID}/channels`, {
          method: "POST",
          body: JSON.stringify({
            name: ch.name,
            type: ch.type,
            parent_id: categoryChannel.id,
            topic: ch.topic || undefined,
            permission_overwrites: overwrites,
          }),
        });
        targetChannelId = created.id;
        channelMap.set(created.name.toLowerCase(), created);

        // Send initial message if defined
        if (ch.initialMessage && created.type === 0) {
          try {
            await discordFetch(`/channels/${created.id}/messages`, {
              method: "POST",
              body: JSON.stringify(ch.initialMessage),
            });
            console.log(`    \x1b[32m✔\x1b[0m Sent initial welcome embed to #${ch.name}`);
          } catch (err) {
            console.warn(`    ⚠️ Could not send initial message to #${ch.name}: ${err.message}`);
          }
        }
      } else {
        // Sync security permissions and topic on existing channels!
        console.log(
          `  \x1b[33m[Syncing Security]\x1b[0m Updating #${ch.name} permissions to \x1b[1m${ch.profile}\x1b[0m...`
        );
        try {
          await discordFetch(`/channels/${existing.id}`, {
            method: "PATCH",
            body: JSON.stringify({
              topic: ch.topic || undefined,
              permission_overwrites: overwrites,
            }),
          });
          console.log(`    \x1b[32m✔\x1b[0m Locked down #${ch.name} with ${ch.profile} rules.`);
        } catch (err) {
          console.warn(`    ⚠️ Could not update #${ch.name} permissions: ${err.message}`);
        }
      }
    }
  }

  console.log(
    `\n\x1b[32m🎉 Success! All Hudbird UI channels and security permissions have been synchronized!\x1b[0m`
  );
}

run().catch((err) => {
  console.error(`\x1b[31m[Failed]\x1b[0m`, err.message);
  process.exit(1);
});
