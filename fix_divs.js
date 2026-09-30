const fs = require("fs");
const files = [
  "packages/marketing/src/blocks/Hospitality/Dining/HospitalityDining.tsx",
  "packages/marketing/src/blocks/Hospitality/Spa/HospitalitySpa.tsx",
  "packages/marketing/src/blocks/Hospitality/Experiences/HospitalityExperiences.tsx",
  "packages/marketing/src/blocks/Hospitality/Highlights/HospitalityHighlights.tsx",
];

files.forEach((file) => {
  let content = fs.readFileSync(file, "utf8");
  let lines = content.split("\n");
  let inTargetDiv = false;
  let divDepth = 0;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Check if line contains the target div
    if (line.includes('<div className="relative w-full overflow-hidden" style={{ aspectRatio:')) {
      lines[i] = line.replace("<div", "<motion.div");
      inTargetDiv = true;
      divDepth = 1;
      continue;
    }

    if (inTargetDiv) {
      if (line.includes("<div")) divDepth++;
      if (line.includes("</div")) divDepth--;

      if (divDepth === 0) {
        lines[i] = line.replace("</div>", "</motion.div>");
        inTargetDiv = false;
      }
    }
  }

  fs.writeFileSync(file, lines.join("\n"));
});
console.log("Fixed all files");
