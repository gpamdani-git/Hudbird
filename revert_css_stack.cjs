const fs = require('fs');
const files = [
  'packages/marketing/src/blocks/Hospitality/Hero/HospitalityHero.tsx',
  'packages/marketing/src/blocks/Hospitality/Highlights/HospitalityHighlights.tsx',
  'packages/marketing/src/blocks/Hospitality/Dining/HospitalityDining.tsx',
  'packages/marketing/src/blocks/Hospitality/Spa/HospitalitySpa.tsx',
  'packages/marketing/src/blocks/Hospitality/Experiences/HospitalityExperiences.tsx',
  'packages/marketing/src/blocks/Hospitality/FooterHero/HospitalityFooterHero.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Revert Hero
  content = content.replace(/<div className="relative w-full pb-\[100vh\] z-0">\s*<div className="sticky bottom-0 w-full bg-\[#111\]">/g, '<div className="relative w-full bg-[#111]">');
  // Revert Highlights
  content = content.replace(/<div className="relative w-full mt-\[-100vh\] pb-\[100vh\] z-10">\s*<div className="sticky bottom-0 w-full bg-\[#0a192f\] shadow-\[0_-20px_50px_rgba\(0,0,0,0\.5\)\]">/g, '<div className="relative w-full bg-[#0a192f]">');
  // Revert Dining
  content = content.replace(/<div id="section-dining" className="relative w-full mt-\[-100vh\] pb-\[100vh\] z-20">\s*<div className="sticky bottom-0 w-full bg-\[#F5F3E7\]">/g, '<div id="section-dining" className="relative w-full bg-[#F5F3E7]">');
  // Revert Spa
  content = content.replace(/<div id="section-spa" className="relative w-full mt-\[-100vh\] pb-\[100vh\] z-30">\s*<div className="sticky bottom-0 w-full bg-\[#F5F3E7\]">/g, '<div id="section-spa" className="relative w-full bg-[#F5F3E7]">');
  // Revert Experiences
  content = content.replace(/<div id="section-experiences" className="relative w-full mt-\[-100vh\] z-40">\s*<div className="w-full">/g, '<div id="section-experiences" className="relative w-full z-10">');
  // Revert FooterHero
  content = content.replace(/<div className="relative w-full z-50">\s*<motion\.div\s*ref=\{containerRef\}\s*style=\{\{ \.\.\.liquidMaskTopStyle \}\}/g, '<motion.div\n      ref={containerRef}\n      style={{ ...liquidMaskTopStyle, zIndex: 20 }}');

  // Remove trailing </div> for Hero, Highlights, Dining, Spa, Experiences
  if (file.includes('Hero/HospitalityHero.tsx')) {
    content = content.replace(/<\/AnimatePresence>\s*<\/div>\s*<\/div>\s*\);\s*\}/g, '</AnimatePresence>\n    </div>\n  );\n}');
  }
  if (file.includes('Highlights/HospitalityHighlights.tsx')) {
    content = content.replace(/<\/motion\.section>\s*<\/div>\s*<\/div>\s*\);\s*\}/g, '</motion.section>\n    </div>\n  );\n}');
  }
  if (file.includes('Dining/HospitalityDining.tsx')) {
    content = content.replace(/<\/motion\.section>\s*<\/div>\s*<\/div>\s*\);\s*\}/g, '</motion.section>\n    </div>\n  );\n}');
  }
  if (file.includes('Spa/HospitalitySpa.tsx')) {
    content = content.replace(/<\/motion\.section>\s*<\/div>\s*<\/div>\s*\);\s*\}/g, '</motion.section>\n    </div>\n  );\n}');
  }
  if (file.includes('Experiences/HospitalityExperiences.tsx')) {
    content = content.replace(/<\/motion\.section>\s*<\/div>\s*<\/div>\s*\);\s*\}/g, '</motion.section>\n    </div>\n  );\n}');
  }
  if (file.includes('FooterHero/HospitalityFooterHero.tsx')) {
    content = content.replace(/<\/motion\.div>\s*<\/div>\s*\);\s*\}/g, '</motion.div>\n  );\n}');
  }
  
  fs.writeFileSync(file, content);
}
console.log("Done reverting CSS stack");
