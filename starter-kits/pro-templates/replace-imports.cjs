const fs = require("fs");
const path = require("path");

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith(".ts") || fullPath.endsWith(".tsx")) {
      let content = fs.readFileSync(fullPath, "utf8");
      if (content.includes("@hudbird/ui")) {
        content = content.replace(/@hudbird\/ui/g, "@/components/ui");
        fs.writeFileSync(fullPath, content);
        console.log("Updated", fullPath);
      }
      if (content.includes("@hudbird/core")) {
        content = content.replace(/@hudbird\/core/g, "@/components/ui");
        fs.writeFileSync(fullPath, content);
        console.log("Updated", fullPath);
      }
      if (content.includes("@hudbird/theme")) {
        content = content.replace(/@hudbird\/theme/g, "@/lib/utils"); // or somewhere
        fs.writeFileSync(fullPath, content);
        console.log("Updated", fullPath);
      }
      if (content.includes("@hudbird/marketing")) {
        content = content.replace(/@hudbird\/marketing/g, "@/components/marketing");
        fs.writeFileSync(fullPath, content);
        console.log("Updated", fullPath);
      }
    }
  }
}

processDir(path.join(__dirname, "src"));
console.log("Done");
