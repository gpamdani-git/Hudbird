const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      if (content.includes('../../utils/cn')) {
        content = content.replace(/\.\.\/\.\.\/utils\/cn/g, '@/lib/cn');
        changed = true;
      }
      if (content.includes('../utils/cn')) {
        content = content.replace(/\.\.\/utils\/cn/g, '@/lib/cn');
        changed = true;
      }
      if (content.includes('../../lib/cn')) {
        content = content.replace(/\.\.\/\.\.\/lib\/cn/g, '@/lib/cn');
        changed = true;
      }
      if (changed) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

processDir(path.join(__dirname, 'src'));
