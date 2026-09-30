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
  if (!content.includes('SmoothStackingWrapper')) {
    content = content.replace(/(import React.*?;\n)/, '$1import { SmoothStackingWrapper } from "../../../components/SmoothStackingWrapper";\n');
  }

  // Remove CSS sticky
  if (path.includes('Hero/HospitalityHero.tsx')) {
    content = content.replace(/<div className="relative w-full pb-\[100vh\] z-0">\s*<div className="sticky bottom-0 w-full bg-\[#111\]">/, `<SmoothStackingWrapper zIndex={${zIndex}}>\n      <div className="relative w-full bg-[#111]">`);
    content = content.replace(/<\/AnimatePresence>\s*<\/div>\s*<\/div>/, '</AnimatePresence>\n      </div>\n    </SmoothStackingWrapper>');
  }
  if (path.includes('Highlights/HospitalityHighlights.tsx')) {
    content = content.replace(/<div className="relative w-full mt-\[-100vh\] pb-\[100vh\] z-10">\s*<div className="sticky bottom-0 w-full bg-\[#0a192f\] shadow-\[0_-20px_50px_rgba\(0,0,0,0\.5\)\]">/, `<SmoothStackingWrapper zIndex={${zIndex}}>\n      <div className="relative w-full bg-[#0a192f]">`);
    content = content.replace(/<\/motion\.section>\s*<\/div>\s*<\/div>/, '</motion.section>\n      </div>\n    </SmoothStackingWrapper>');
  }
  if (path.includes('Dining/HospitalityDining.tsx')) {
    content = content.replace(/<div id="section-dining" className="relative w-full mt-\[-100vh\] pb-\[100vh\] z-20">\s*<div className="sticky bottom-0 w-full bg-\[#F5F3E7\]">/, `<SmoothStackingWrapper zIndex={${zIndex}}>\n      <div id="section-dining" className="relative w-full bg-[#F5F3E7]">`);
    content = content.replace(/<\/motion\.section>\s*<\/div>\s*<\/div>/, '</motion.section>\n      </div>\n    </SmoothStackingWrapper>');
  }
  if (path.includes('Spa/HospitalitySpa.tsx')) {
    content = content.replace(/<div id="section-spa" className="relative w-full mt-\[-100vh\] pb-\[100vh\] z-30">\s*<div className="sticky bottom-0 w-full bg-\[#F5F3E7\]">/, `<SmoothStackingWrapper zIndex={${zIndex}}>\n      <div id="section-spa" className="relative w-full bg-[#F5F3E7]">`);
    content = content.replace(/<\/motion\.section>\s*<\/div>\s*<\/div>/, '</motion.section>\n      </div>\n    </SmoothStackingWrapper>');
  }
  if (path.includes('Experiences/HospitalityExperiences.tsx')) {
    content = content.replace(/<div id="section-experiences" className="relative w-full mt-\[-100vh\] z-40">\s*<div className="w-full">/, `<SmoothStackingWrapper zIndex={${zIndex}}>\n      <div id="section-experiences" className="relative w-full z-10">`);
    content = content.replace(/<\/motion\.section>\s*<\/div>\s*<\/div>/, '</motion.section>\n      </div>\n    </SmoothStackingWrapper>');
  }
  
  fs.writeFileSync(path, content);
}
console.log("Done applying SmoothStackingWrapper");
