import fs from 'node:fs';
import path from 'node:path';

const TOC_FILE = path.resolve(process.cwd(), 'apps/docs/src/tocData.ts');

let content = fs.readFileSync(TOC_FILE, 'utf-8');

// Regex to find TOC array definition in tocData.ts
const tocRegex = /export const [a-zA-Z]+TocItems: TocItem\[\] = \[\s*([\s\S]*?)\];/g;

let modified = false;

const newContent = content.replace(tocRegex, (match, arrayContent) => {
  // If it already has installation, do nothing
  if (arrayContent.includes('id: "installation"')) {
    return match;
  }
  
  // Exclude getting started and changelog
  if (match.includes('gettingStartedTocItems') || match.includes('changelogTocItems')) {
    return match;
  }

  modified = true;

  // Check if it has component-api or overview
  if (arrayContent.includes('id: "component-api"')) {
    return match.replace(/\{\s*id:\s*"component-api"/, `{ id: "installation", title: "Installation" },\n  { id: "component-api"`);
  } else if (arrayContent.includes('id: "overview"')) {
    return match.replace(/\{\s*id:\s*"overview"/, `{ id: "installation", title: "Installation" },\n  { id: "overview"`);
  } else {
    // If neither, insert at the top of the array
    return match.replace(/=\s*\[/, `= [\n  { id: "installation", title: "Installation" },`);
  }
});

if (modified) {
  fs.writeFileSync(TOC_FILE, newContent, 'utf-8');
  console.log(`Updated TOC in tocData.ts`);
} else {
  console.log('No changes needed in tocData.ts');
}
