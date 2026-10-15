const fs = require("fs");
const path = require("path");

const pagesDir = path.join(__dirname, "src/pages");
const files = fs.readdirSync(pagesDir).filter((f) => f.endsWith(".tsx"));

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  // Replace bg-zinc-200/50 blur-[X] with bg-zinc-200/50 dark:bg-blue-600/20 blur-[X] if dark: is missing
  content = content.replace(
    /(bg-zinc-[0-9]{2,3}\/[0-9]+)\s+(blur-\[[0-9]+px\])(?!\s*dark:bg-)/g,
    "$1 dark:bg-blue-600/15 $2"
  );

  // Also check if blur is before
  content = content.replace(
    /(blur-\[[0-9]+px\])\s+(bg-zinc-[0-9]{2,3}\/[0-9]+)(?!\s*dark:bg-)/g,
    "$1 $2 dark:bg-blue-600/15"
  );

  // Also replace bg-zinc-200/50 blur-[100px] specifically
  content = content.replace(
    /bg-zinc-200\/50 blur-\[100px\](?!.*dark:bg)/g,
    "bg-zinc-200/50 dark:bg-blue-600/15 blur-[100px]"
  );
  content = content.replace(
    /bg-zinc-200\/50 blur-\[120px\](?!.*dark:bg)/g,
    "bg-zinc-200/50 dark:bg-blue-600/15 blur-[120px]"
  );

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
}
