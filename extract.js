const fs = require("fs");
const path = require("path");
const glob = require("glob"); // Not available, will use readdirSync

const docsDir = path.join(__dirname, "apps/docs/src/pages/marketing");
const files = fs.readdirSync(docsDir).filter((f) => f.endsWith(".tsx"));

for (const file of files) {
  const content = fs.readFileSync(path.join(docsDir, file), "utf8");
  const matches = content.match(/const \w+Code = `([\s\S]*?)`;/g);
  if (matches) {
    console.log(`\n\n=== ${file} ===`);
    matches.forEach((m) => {
      const varName = m.match(/const (\w+)Code/)[1];
      console.log(`\n--- ${varName} ---`);
      const bodyMatch = m.match(/return \(([\s\S]*?)\n {2}\)/);
      if (bodyMatch) {
        console.log(bodyMatch[1]);
      } else {
        console.log("NO BODY MATCH", m.substring(0, 50));
      }
    });
  }
}
