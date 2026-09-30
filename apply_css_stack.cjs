const fs = require('fs');
const files = [
  'packages/marketing/src/blocks/Hospitality/Hero/HospitalityHero.tsx',
  'packages/marketing/src/blocks/Hospitality/Highlights/HospitalityHighlights.tsx',
  'packages/marketing/src/blocks/Hospitality/Dining/HospitalityDining.tsx',
  'packages/marketing/src/blocks/Hospitality/Spa/HospitalitySpa.tsx',
  'packages/marketing/src/blocks/Hospitality/Experiences/HospitalityExperiences.tsx'
];

for (const path of files) {
  let content = fs.readFileSync(path, 'utf8');
  
  // Remove StackingWrapper import
  content = content.replace(/import \{ StackingWrapper \} from "\.\.\/\.\.\/\.\.\/components\/StackingWrapper";\n/, '');

  // Hero
  if (path.includes('Hero/HospitalityHero.tsx')) {
    content = content.replace(/<StackingWrapper zIndex=\{0\}>\n\s*<div className="relative w-full bg-\[#111\]">/, '<div className="relative w-full pb-[100vh] z-0">\n      <div className="sticky bottom-0 w-full bg-[#111]">');
    content = content.replace(/<\/AnimatePresence>\n\s*<\/div>\n\s*<\/StackingWrapper>/, '</AnimatePresence>\n      </div>\n    </div>');
  }
  // Highlights
  if (path.includes('Highlights/HospitalityHighlights.tsx')) {
    content = content.replace(/<StackingWrapper zIndex=\{10\}>\n\s*<div className="relative w-full bg-\[#0a192f\]">/, '<div className="relative w-full mt-[-100vh] pb-[100vh] z-10">\n      <div className="sticky bottom-0 w-full bg-[#0a192f] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">');
    content = content.replace(/<\/motion\.section>\n\s*<\/div>\n\s*<\/StackingWrapper>/, '</motion.section>\n      </div>\n    </div>');
  }
  // Dining
  if (path.includes('Dining/HospitalityDining.tsx')) {
    content = content.replace(/<StackingWrapper zIndex=\{20\}>\n\s*<div id="section-dining" className="relative w-full bg-\[#F5F3E7\]">/, '<div id="section-dining" className="relative w-full mt-[-100vh] pb-[100vh] z-20">\n      <div className="sticky bottom-0 w-full bg-[#F5F3E7]">');
    content = content.replace(/<\/motion\.section>\n\s*<\/div>\n\s*<\/StackingWrapper>/, '</motion.section>\n      </div>\n    </div>');
  }
  // Spa
  if (path.includes('Spa/HospitalitySpa.tsx')) {
    content = content.replace(/<StackingWrapper zIndex=\{30\}>\n\s*<div id="section-spa" className="relative w-full bg-\[#F5F3E7\]">/, '<div id="section-spa" className="relative w-full mt-[-100vh] pb-[100vh] z-30">\n      <div className="sticky bottom-0 w-full bg-[#F5F3E7]">');
    content = content.replace(/<\/motion\.section>\n\s*<\/div>\n\s*<\/StackingWrapper>/, '</motion.section>\n      </div>\n    </div>');
  }
  // Experiences (No pb-[100vh] for section 5, only mt-[-100vh] to slide over 4, and NO sticky because it shouldn't stick for section 6)
  if (path.includes('Experiences/HospitalityExperiences.tsx')) {
    content = content.replace(/<StackingWrapper zIndex=\{40\}>\n\s*<div id="section-experiences" className="relative w-full z-10">/, '<div id="section-experiences" className="relative w-full mt-[-100vh] z-40">\n      <div className="w-full">');
    content = content.replace(/<\/motion\.section>\n\s*<\/div>\n\s*<\/StackingWrapper>/, '</motion.section>\n      </div>\n    </div>');
  }
  
  fs.writeFileSync(path, content);
}

console.log("Done applying CSS Stacking");
