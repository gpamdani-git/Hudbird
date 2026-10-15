const fs = require("fs");
const path = require("path");

const colors = ["primary", "success", "danger", "warning", "info", "destructive"];

function replaceTextInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  for (const c of colors) {
    // Replace `text-{color}` with `text-{color}-text`
    // We must be careful not to replace `text-{color}-foreground` or `text-{color}-soft`
    // Regex: text-{color} followed by space, quote, or EOF
    const regex = new RegExp(`text-${c}(?=[\\s"'\`])`, "g");
    content = content.replace(regex, `text-${c}-text`);
  }

  fs.writeFileSync(filePath, content);
}

const componentsDir = "./packages/core/src/components";
const filesToUpdate = [
  "Badge/Badge.tsx",
  "Button/Button.tsx",
  "Tabs/Tabs.tsx",
  "Pagination/Pagination.tsx",
];

for (const file of filesToUpdate) {
  const p = path.join(componentsDir, file);
  if (fs.existsSync(p)) {
    replaceTextInFile(p);
  }
}
console.log("Text refactoring complete.");
