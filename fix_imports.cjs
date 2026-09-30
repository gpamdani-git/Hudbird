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
  content = content.replace(/from "\.\.\/\.\.\/components\/StackingWrapper";/g, 'from "../../../components/StackingWrapper";');
  fs.writeFileSync(path, content);
}
console.log("Done fixing imports");
