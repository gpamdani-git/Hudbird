const fs = require('fs');
const files = [
  { path: 'packages/marketing/src/blocks/Hospitality/Hero/HospitalityHero.tsx', zIndex: 0 },
  { path: 'packages/marketing/src/blocks/Hospitality/Highlights/HospitalityHighlights.tsx', zIndex: 10 },
  { path: 'packages/marketing/src/blocks/Hospitality/Dining/HospitalityDining.tsx', zIndex: 20 },
  { path: 'packages/marketing/src/blocks/Hospitality/Spa/HospitalitySpa.tsx', zIndex: 30 },
  { path: 'packages/marketing/src/blocks/Hospitality/Experiences/HospitalityExperiences.tsx', zIndex: 40 }
];

for (const { path, zIndex } of files) {
  let content = fs.readFileSync(path, 'utf8');
  
  // Add import if not exists
  if (!content.includes('StackingWrapper')) {
    content = content.replace(/(import React.*?;\n)/, '$1import { StackingWrapper } from "../../components/StackingWrapper";\n');
  }

  // Wrap return block
  // Hero
  if (path.includes('Hero/HospitalityHero.tsx')) {
    content = content.replace(/<div className="relative w-full bg-\[#111\]">/, `<StackingWrapper zIndex={${zIndex}}>\n    <div className="relative w-full bg-[#111]">`);
    content = content.replace(/<\/AnimatePresence>\n\s*<\/div>\n\s*\);\n\}/, '</AnimatePresence>\n    </div>\n    </StackingWrapper>\n  );\n}');
  }
  // Highlights
  if (path.includes('Highlights/HospitalityHighlights.tsx')) {
    content = content.replace(/<div className="relative w-full bg-\[#0a192f\]">/, `<StackingWrapper zIndex={${zIndex}}>\n    <div className="relative w-full bg-[#0a192f]">`);
    content = content.replace(/<\/motion\.section>\n\s*<\/div>\n\s*\);\n\}/, '</motion.section>\n    </div>\n    </StackingWrapper>\n  );\n}');
  }
  // Dining
  if (path.includes('Dining/HospitalityDining.tsx')) {
    content = content.replace(/<div id="section-dining" className="relative w-full bg-\[#F5F3E7\]">/, `<StackingWrapper zIndex={${zIndex}}>\n    <div id="section-dining" className="relative w-full bg-[#F5F3E7]">`);
    content = content.replace(/<\/motion\.section>\n\s*<\/div>\n\s*\);\n\}/, '</motion.section>\n    </div>\n    </StackingWrapper>\n  );\n}');
  }
  // Spa
  if (path.includes('Spa/HospitalitySpa.tsx')) {
    content = content.replace(/<div id="section-spa" className="relative w-full bg-\[#F5F3E7\]">/, `<StackingWrapper zIndex={${zIndex}}>\n    <div id="section-spa" className="relative w-full bg-[#F5F3E7]">`);
    content = content.replace(/<\/motion\.section>\n\s*<\/div>\n\s*\);\n\}/, '</motion.section>\n    </div>\n    </StackingWrapper>\n  );\n}');
  }
  // Experiences
  if (path.includes('Experiences/HospitalityExperiences.tsx')) {
    content = content.replace(/<div id="section-experiences" className="relative w-full z-10">/, `<StackingWrapper zIndex={${zIndex}}>\n    <div id="section-experiences" className="relative w-full z-10">`);
    content = content.replace(/<\/motion\.section>\n\s*<\/div>\n\s*\);\n\}/, '</motion.section>\n    </div>\n    </StackingWrapper>\n  );\n}');
  }
  
  fs.writeFileSync(path, content);
}

// Add StackingWrapper to exports so it's clean
let indexContent = fs.readFileSync('packages/marketing/src/components/index.ts', 'utf8');
if (!indexContent.includes('StackingWrapper')) {
  fs.writeFileSync('packages/marketing/src/components/index.ts', indexContent + '\nexport * from "./StackingWrapper";\n');
}

console.log("Done applying StackingWrapper");
