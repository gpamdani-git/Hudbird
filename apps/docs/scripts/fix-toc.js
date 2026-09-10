import fs from "node:fs";
import path from "node:path";

const PAGES_DIR = path.resolve(process.cwd(), "apps/docs/src/pages");

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");

  // Regex to find TOC array definition
  const tocRegex = /export const [a-zA-Z]+TocItems = \[\s*([\s\S]*?)\];/g;

  let modified = false;

  const newContent = content.replace(tocRegex, (match, arrayContent) => {
    // If it already has installation, do nothing
    if (arrayContent.includes('id: "installation"')) {
      return match;
    }

    modified = true;

    // Check if it has component-api
    if (arrayContent.includes('id: "component-api"')) {
      // Insert right before component-api
      // We can do a string replacement on the first occurrence of component-api
      return match.replace(
        /\{\s*id:\s*"component-api"/,
        `{ id: "installation", title: "Installation" },\n  { id: "component-api"`
      );
    } else {
      // If no component-api, insert at the top of the array
      // Find the opening bracket and insert
      return match.replace(/=\s*\[/, `= [\n  { id: "installation", title: "Installation" },`);
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, newContent, "utf-8");
    console.log(`Updated TOC in ${path.basename(filePath)}`);
  }
}

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath);
    } else if (fullPath.endsWith("Doc.tsx")) {
      processFile(fullPath);
    }
  }
}

scanDir(PAGES_DIR);
console.log("Done fixing TOCs!");
