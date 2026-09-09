import fs from 'node:fs';
import path from 'node:path';

const PAGES_DIR = path.resolve(process.cwd(), 'apps/docs/src/pages');
const MARKETING_DIR = path.resolve(PAGES_DIR, 'marketing');

function processDocFile(filePath, isMarketing = false) {
  const fileName = path.basename(filePath);
  if (!fileName.endsWith('Doc.tsx') || fileName === 'GettingStartedDoc.tsx' || fileName === 'ChangelogDoc.tsx') return;

  const componentName = fileName.replace('Doc.tsx', '');
  
  if (['StackedLayout', 'AuthLayout', 'Sidebar'].includes(componentName)) {
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  
  // 1. Remove the bad manualCode="import { Button..." from the <InstallationTabs ... /> that the user's script just added.
  content = content.replace(/manualCode=\{`[\s\S]*?`\}/g, '');
  content = content.replace(/manualCode=".*?"/g, '');

  // 2. We need to add manualCode={xxxCode} back to it
  const importCodeVar = `${componentName.charAt(0).toLowerCase() + componentName.slice(1)}Code`;
  content = content.replace(new RegExp(`(<InstallationTabs\\s+componentName="${componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}")\\s*/?>`, 'g'), (match, p1) => {
    return `${p1} manualCode={${importCodeVar}} />`;
  });
  
  // Make sure the import statement exists
  let importPath = isMarketing 
    ? `../../../../../packages/marketing/src/components/${componentName}/${componentName}.tsx?raw`
    : `../../../../packages/core/src/components/${componentName}/${componentName}.tsx?raw`;

  const rawImportStmt = `import ${importCodeVar} from "${importPath}";\n`;
  if (!content.includes(`import ${importCodeVar} `) && !content.includes(`import ${importCodeVar}\n`)) {
    const lines = content.split('\n');
    lines.splice(1, 0, rawImportStmt.trim());
    content = lines.join('\n');
  }
  
  fs.writeFileSync(filePath, content, 'utf-8');
}

const coreFiles = fs.readdirSync(PAGES_DIR).filter(f => f.endsWith('.tsx'));
coreFiles.forEach(f => processDocFile(path.join(PAGES_DIR, f), false));

if (fs.existsSync(MARKETING_DIR)) {
  const marketingFiles = fs.readdirSync(MARKETING_DIR).filter(f => f.endsWith('.tsx'));
  marketingFiles.forEach(f => processDocFile(path.join(MARKETING_DIR, f), true));
}

console.log("Reverted to raw source codes!");
