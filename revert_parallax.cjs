const fs = require('fs');

const files = [
  'packages/marketing/src/blocks/Hospitality/Hero/HospitalityHero.tsx',
  'packages/marketing/src/blocks/Hospitality/Highlights/HospitalityHighlights.tsx',
  'packages/marketing/src/blocks/Hospitality/Dining/HospitalityDining.tsx',
  'packages/marketing/src/blocks/Hospitality/Spa/HospitalitySpa.tsx',
  'packages/marketing/src/blocks/Hospitality/Experiences/HospitalityExperiences.tsx',
  'packages/marketing/src/blocks/Hospitality/FooterHero/HospitalityFooterHero.tsx',
  'packages/marketing/src/blocks/Hospitality/CuratedJourneys/HospitalityCuratedJourneys.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove the parallax logic
    content = content.replace(/const sectionRef = React\.useRef<HTMLDivElement>\(null\);\s*const \{ scrollYProgress: exitProgress \} = useScroll\(\{\s*target: sectionRef,\s*offset: \["end bottom", "end top"\]\s*\}\);\s*const parallaxY = useTransform\(exitProgress, \[0, 1\], \["0vh", "50vh"\]\);\s*/g, '');
    content = content.replace(/const \{ scrollYProgress: exitProgress \} = useScroll\(\{\s*target: containerRef,\s*offset: \["end bottom", "end top"\]\s*\}\);\s*const parallaxY = useTransform\(exitProgress, \[0, 1\], \["0vh", "50vh"\]\);\s*/g, '');

    // Remove <motion.div style={{ y: parallaxY }}> and </motion.div> around it
    // This requires careful string replacement because there are many motion.divs.
    // Instead of regex for the closing tag, let's just do a git checkout since we only modified these files!
  }
});
