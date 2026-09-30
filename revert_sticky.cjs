const fs = require('fs');

const files = [
  { file: 'packages/marketing/src/blocks/Hospitality/Hero/HospitalityHero.tsx', target: '<div className="sticky bottom-0 w-full bg-[#111]">', replacement: '<div className="relative w-full bg-[#111]">' },
  { file: 'packages/marketing/src/blocks/Hospitality/Highlights/HospitalityHighlights.tsx', target: '<div className="sticky bottom-0 w-full bg-[#0a192f]">', replacement: '<div className="relative w-full bg-[#0a192f]">' },
  { file: 'packages/marketing/src/blocks/Hospitality/Dining/HospitalityDining.tsx', target: '<div id="section-dining" className="sticky bottom-0 w-full bg-[#F5F3E7]">', replacement: '<div id="section-dining" className="relative w-full bg-[#F5F3E7]">' },
  { file: 'packages/marketing/src/blocks/Hospitality/Spa/HospitalitySpa.tsx', target: '<div id="section-spa" className="sticky bottom-0 w-full bg-[#F5F3E7]">', replacement: '<div id="section-spa" className="relative w-full bg-[#F5F3E7]">' },
  { file: 'packages/marketing/src/blocks/Hospitality/Experiences/HospitalityExperiences.tsx', target: '<div id="section-experiences" className="sticky bottom-0 w-full z-10">', replacement: '<div id="section-experiences" className="relative w-full z-10">' },
  { file: 'packages/marketing/src/blocks/Hospitality/FooterHero/HospitalityFooterHero.tsx', target: 'className="sticky bottom-0 w-full overflow-hidden bg-[#F5F3E7] mt-[-8vw]"', replacement: 'className="relative w-full overflow-hidden bg-[#F5F3E7] mt-[-8vw]"' },
  { file: 'packages/marketing/src/blocks/Hospitality/CuratedJourneys/HospitalityCuratedJourneys.tsx', target: '<div className="sticky bottom-0 w-full bg-[#111111] z-30">', replacement: '<div className="relative w-full bg-[#111111]">' },
  { file: 'packages/marketing/src/blocks/Hospitality/Footer/HospitalityFooter.tsx', target: '<footer className="sticky bottom-0 w-full bg-[#363432] pt-16 pb-12 text-[#D8D4CF] font-sans z-40">', replacement: '<footer className="relative w-full bg-[#363432] pt-16 pb-12 text-[#D8D4CF] font-sans">' }
];

files.forEach(f => {
  if (fs.existsSync(f.file)) {
    let content = fs.readFileSync(f.file, 'utf8');
    content = content.replace(f.target, f.replacement);
    fs.writeFileSync(f.file, content);
  }
});
console.log('Reverted all sticky classes');
