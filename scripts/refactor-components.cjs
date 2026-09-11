const fs = require('fs');
const path = require('path');

const colors = ["primary", "success", "danger", "warning", "info", "destructive"];

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // We need to replace variants carefully.
  // We can do standard replacements for known classes.
  
  for (const c of colors) {
    // Alert, Badge flat/light/ghost variants:
    // "bg-primary/10 text-primary border border-primary/20 dark:bg-primary/20 dark:text-primary dark:border-primary/40" -> "bg-primary-soft text-primary-text border border-primary-border-soft"
    
    // Backgrounds
    content = content.replace(new RegExp(`bg-${c}/10`, 'g'), `bg-${c}-soft`);
    content = content.replace(new RegExp(`bg-${c}/20`, 'g'), `bg-${c}-soft-hover`);
    content = content.replace(new RegExp(`bg-${c}/30`, 'g'), `bg-${c}-soft-active`);
    
    // Borders
    content = content.replace(new RegExp(`border-${c}/20`, 'g'), `border-${c}-border-soft`);
    content = content.replace(new RegExp(`border-${c}/40`, 'g'), `border-${c}-border-soft`);
    content = content.replace(new RegExp(`border-${c}/50`, 'g'), `border-${c}-border`);
    content = content.replace(new RegExp(`ring-${c}/20`, 'g'), `ring-${c}-border-soft`);
    
    // Remove dark classes that duplicate the soft ones since soft variables handle it now!
    // But be careful not to break everything. A regex is safer for specific components.
  }

  fs.writeFileSync(filePath, content);
}

const componentsDir = './packages/core/src/components';
const filesToUpdate = [
  'Badge/Badge.tsx',
  'Button/Button.tsx',
  'Tabs/Tabs.tsx',
  'Pagination/Pagination.tsx'
];

for (const file of filesToUpdate) {
  const p = path.join(componentsDir, file);
  if (fs.existsSync(p)) {
    replaceInFile(p);
  }
}
console.log('Refactoring complete.');
