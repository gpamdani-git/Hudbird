const fs = require('fs');
const files = [
  'packages/marketing/src/blocks/Hospitality/Dining/HospitalityDining.tsx',
  'packages/marketing/src/blocks/Hospitality/Spa/HospitalitySpa.tsx',
  'packages/marketing/src/blocks/Hospitality/Experiences/HospitalityExperiences.tsx',
  'packages/marketing/src/blocks/Hospitality/Highlights/HospitalityHighlights.tsx'
];

const galleryStyle = `
  const liquidMaskGalleryStyle = {
    WebkitMaskImage: useMotionTemplate\`\${svgMaskTop}, \${svgMask}, linear-gradient(black, black)\`,
    WebkitMaskSize: "100% 3vw, 100% 3vw, 100% calc(100% - 6vw + 4px)",
    WebkitMaskPosition: "top left, bottom left, center left",
    WebkitMaskRepeat: "no-repeat, no-repeat, no-repeat",
    maskImage: useMotionTemplate\`\${svgMaskTop}, \${svgMask}, linear-gradient(black, black)\`,
    maskSize: "100% 3vw, 100% 3vw, 100% calc(100% - 6vw + 4px)",
    maskPosition: "top left, bottom left, center left",
    maskRepeat: "no-repeat, no-repeat, no-repeat",
  };
`;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Inject liquidMaskGalleryStyle if not already there
  if (!content.includes('liquidMaskGalleryStyle')) {
    content = content.replace(
      'const contentY = useTransform(',
      galleryStyle + '\n  const contentY = useTransform('
    );
  }
  
  // Replace liquidMaskBothStyle with liquidMaskGalleryStyle for lines containing 'aspectRatio:'
  let lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('aspectRatio:') && lines[i].includes('liquidMaskBothStyle')) {
      lines[i] = lines[i].replace('liquidMaskBothStyle', 'liquidMaskGalleryStyle');
    }
  }
  
  fs.writeFileSync(file, lines.join('\n'));
});

console.log('Fixed mask size for gallery images');
