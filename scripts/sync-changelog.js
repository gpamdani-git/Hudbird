import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const changelogPath = path.resolve(__dirname, "../packages/cli/CHANGELOG.md");
const outPath = path.resolve(__dirname, "../apps/docs/src/data/changelog.json");

function syncChangelog() {
  if (!fs.existsSync(changelogPath)) {
    console.warn(`[sync-changelog] Warning: Could not find ${changelogPath}`);
    return;
  }

  const content = fs.readFileSync(changelogPath, "utf8");

  // Load existing to preserve dates
  let existingData = [];
  if (fs.existsSync(outPath)) {
    try {
      existingData = JSON.parse(fs.readFileSync(outPath, "utf8"));
    } catch (e) {
      console.warn("[sync-changelog] Could not parse existing changelog.json");
    }
  }

  const versionRegex = /^##\s+(.+)$/gm;
  let versions = [];
  let match;
  let matches = [];

  while ((match = versionRegex.exec(content)) !== null) {
    matches.push({ version: match[1].trim(), index: match.index, raw: match[0] });
  }

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index + matches[i].raw.length;
    const end = matches[i + 1] ? matches[i + 1].index : content.length;
    let body = content.substring(start, end).trim();

    // Clean up empty lines and standard changeset headings if necessary
    // "### Minor Changes" or "### Patch Changes"
    body = body.replace(/^### (Minor|Patch|Major) Changes$/gm, "").trim();

    const version = matches[i].version;
    const existing = existingData.find((v) => v.version === version);

    // Default to current date for new ones
    const date = existing
      ? existing.date
      : new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

    versions.push({
      version,
      date,
      content: body,
    });
  }

  // Make sure output dir exists
  const outDir = path.dirname(outPath);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(outPath, JSON.stringify(versions, null, 2));
  console.log(`[sync-changelog] Successfully synced ${versions.length} versions to changelog.json`);
}

syncChangelog();
