#!/usr/bin/env node

/**
 * Hudbird UI - Discord Slash Commands Registration Script
 * Registers /docs, /cli, /skill, and /community to Discord REST API.
 *
 * Usage:
 *   DISCORD_APPLICATION_ID="your_app_id" DISCORD_BOT_TOKEN="your_token" node scripts/register-discord-commands.mjs
 *   or via .env.local:
 *   DISCORD_APPLICATION_ID=...
 *   DISCORD_BOT_TOKEN=...
 *   DISCORD_GUILD_ID=... (optional: if provided, registers instantly to that server)
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

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

const APP_ID = process.env.DISCORD_APPLICATION_ID || process.argv[2];
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || process.argv[3];
const GUILD_ID = process.env.DISCORD_GUILD_ID || process.argv[4];

if (!APP_ID || !BOT_TOKEN) {
  console.error(`\x1b[31m[Error] Missing credentials!\x1b[0m`);
  console.log(`
Please provide DISCORD_APPLICATION_ID and DISCORD_BOT_TOKEN.

Usage:
  DISCORD_APPLICATION_ID="your_app_id" DISCORD_BOT_TOKEN="your_token" node scripts/register-discord-commands.mjs

Optional: Add DISCORD_GUILD_ID to register instantly to your community server (0s delay).
`);
  process.exit(1);
}

const COMMANDS = [
  {
    name: "docs",
    description: "Look up Hudbird UI components, live sandboxes, and documentation",
    options: [
      {
        name: "component",
        description: "Component name (with autocomplete)",
        type: 3, // STRING
        required: false,
        autocomplete: true,
      },
    ],
  },
  {
    name: "cli",
    description: "Get instant CLI scaffolding commands for Hudbird UI components",
    options: [
      {
        name: "component",
        description: "Component name to add (with autocomplete)",
        type: 3,
        required: false,
        autocomplete: true,
      },
    ],
  },
  {
    name: "skill",
    description: "Get official Hudbird UI AI Skill commands for Claude, Antigravity, Cursor, etc.",
    options: [
      {
        name: "platform",
        description: "Your AI model / environment",
        type: 3,
        required: false,
        choices: [
          { name: "Claude Code CLI", value: "claude" },
          { name: "Google Antigravity", value: "antigravity" },
          { name: "Cursor IDE", value: "cursor" },
          { name: "All Platforms (Universal)", value: "all" },
        ],
      },
    ],
  },
  {
    name: "community",
    description: "View official Hudbird UI repository, website, npm registry, and links",
  },
];

async function register() {
  const target = GUILD_ID
    ? `https://discord.com/api/v10/applications/${APP_ID}/guilds/${GUILD_ID}/commands`
    : `https://discord.com/api/v10/applications/${APP_ID}/commands`;

  console.log(
    `\x1b[36m[Registering Slash Commands]\x1b[0m Target: ${GUILD_ID ? `Guild ${GUILD_ID} (Instant)` : "Global (All Servers)"}...`
  );

  const res = await fetch(target, {
    method: "PUT",
    headers: {
      Authorization: `Bot ${BOT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(COMMANDS),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Discord API Error [${res.status}]: ${errorText}`);
  }

  const registered = await res.json();
  console.log(`\x1b[32m✔ Successfully registered ${registered.length} slash command(s):\x1b[0m`);
  for (const cmd of registered) {
    console.log(`  - \x1b[1m/${cmd.name}\x1b[0m: ${cmd.description}`);
  }
}

register().catch((err) => {
  console.error(`\x1b[31m[Registration Failed]\x1b[0m`, err.message);
  process.exit(1);
});
