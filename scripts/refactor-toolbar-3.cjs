const fs = require('fs');
const path = require('path');

const filesToFix = [
  "apps/docs/src/pages/ChangelogDoc.tsx",
  "apps/docs/src/pages/GettingStartedDoc.tsx",
  "apps/docs/src/pages/SupportDoc.tsx",
  "apps/docs/src/pages/marketing/FaqDoc.tsx",
  "apps/docs/src/pages/marketing/FeatureSectionDoc.tsx",
  "apps/docs/src/pages/marketing/HeroDoc.tsx",
  "apps/docs/src/pages/marketing/LogoCloudDoc.tsx",
  "apps/docs/src/pages/marketing/PricingDoc.tsx",
  "apps/docs/src/pages/marketing/TestimonialsDoc.tsx"
];

for (const relPath of filesToFix) {
  const filePath = path.join(__dirname, '..', relPath);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('<PageToolbar />')) continue;

  const isMarketing = filePath.includes('/marketing/');
  const importPath = isMarketing ? `import { PageToolbar } from "../../components/PageToolbar";\n` : `import { PageToolbar } from "../components/PageToolbar";\n`;
  content = content.replace(/(import React.*?;\n)/, `$1${importPath}`);

  // We want to find:
  // <div className="mt-4"> or <div> followed by <div className="mb-3
  // OR just the <h1> container for Changelog/GettingStarted.
  
  if (content.includes('className="mb-3 flex items-center gap-3"')) {
    // Has standard header
    const regex = /(<div(?: className="mt-4")?>)(\s*<div className="mb-3 flex items-center gap-3">[\s\S]*?<\/p>\s*)<\/div>/;
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
      console.log(`Still failed regex on ${filePath}`);
    }
  } else {
    // Custom header like Changelog
    const regex2 = /(<div(?: className="mb-8")?>)(\s*<h1 className="text-3xl font-bold[\s\S]*?<\/p>\s*)<\/div>/;
    const match2 = content.match(regex2);
    if (match2) {
      const replacement = `<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center mb-8">
        <div className="flex-1 w-full min-w-0 pr-4">${match2[2]}</div>
        <PageToolbar />
      </div>`;
      content = content.replace(regex2, replacement);
      fs.writeFileSync(filePath, content);
      console.log(`Updated custom ${filePath}`);
    } else {
      console.log(`Failed custom regex on ${filePath}`);
    }
  }
}
