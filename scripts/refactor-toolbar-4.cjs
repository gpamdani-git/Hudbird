const fs = require("fs");
const path = require("path");

const filesToFix = [
  "apps/docs/src/pages/SupportDoc.tsx",
  "apps/docs/src/pages/marketing/FeatureSectionDoc.tsx",
  "apps/docs/src/pages/marketing/LogoCloudDoc.tsx",
  "apps/docs/src/pages/marketing/PricingDoc.tsx",
  "apps/docs/src/pages/marketing/TestimonialsDoc.tsx",
];

for (const relPath of filesToFix) {
  const filePath = path.join(__dirname, "..", relPath);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, "utf8");
  if (content.includes("<PageToolbar />")) continue;

  const isMarketing = filePath.includes("/marketing/");
  const importPath = isMarketing
    ? `import { PageToolbar } from "../../components/PageToolbar";\n`
    : `import { PageToolbar } from "../components/PageToolbar";\n`;
  content = content.replace(/(import React.*?;\n)/, `$1${importPath}`);

  if (content.includes('className="mb-3 flex items-center gap-3"')) {
    const regex =
      /(<div className="mb-[0-9]+">)(\s*<div className="mb-3 flex items-center gap-3">[\s\S]*?<\/p>\s*)<\/div>/;
    const match = content.match(regex);
    if (match) {
      const replacement = `<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center mb-8">
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
    console.log(`No standard header found on ${filePath}`);
  }
}
