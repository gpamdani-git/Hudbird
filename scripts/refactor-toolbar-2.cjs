const fs = require("fs");
const path = require("path");

const pagesDir = path.join(__dirname, "../apps/docs/src/pages");

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== "demos") {
        // skip demos
        processDirectory(fullPath);
      }
    } else if (file.endsWith("Doc.tsx")) {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  if (content.includes("<PageToolbar />")) {
    return;
  }

  // 1. Add import
  const isMarketing = filePath.includes("/marketing/");
  const importPath = isMarketing
    ? `import { PageToolbar } from "../../components/PageToolbar";\n`
    : `import { PageToolbar } from "../components/PageToolbar";\n`;

  // Insert import after React imports
  content = content.replace(/(import React.*?;\n)/, `$1${importPath}`);

  // 2. Find the Title block. Relax the regex
  // Find <div className="mb-3 flex items-center gap-3">
  // We want to wrap the parent of this div.
  // We look for:
  // <div(?: className="mt-4")?>\s*<div className="mb-3 flex items-center gap-3">
  const regex =
    /(<div(?: className="mt-4")?>)(\s*<div className="mb-3 flex items-center gap-3">[\s\S]*?<\/p>\s*)<\/div>/;

  const match = content.match(regex);
  if (match) {
    const replacement = `<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex-1 w-full min-w-0 pr-4">${match[2]}</div>
        <PageToolbar />
      </div>`;
    content = content.replace(regex, replacement);
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  } else {
    console.log(`Title block not found in ${filePath}`);
  }
}

processDirectory(pagesDir);
