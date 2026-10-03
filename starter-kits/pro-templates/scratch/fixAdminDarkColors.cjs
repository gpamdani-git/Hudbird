const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const targetDir = path.join(__dirname, '../src/components/admin');

walkDir(targetDir, function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace text-blue-500
    content = content.replace(/bg-zinc-100\/50 text-blue-500(?! dark:)/g, 'bg-zinc-100/50 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400');
    // Replace text-emerald-500
    content = content.replace(/bg-zinc-100\/50 text-emerald-500(?! dark:)/g, 'bg-zinc-100/50 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400');
    // Replace text-rose-500
    content = content.replace(/bg-zinc-100\/50 text-rose-500(?! dark:)/g, 'bg-zinc-100/50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-400');
    // Replace text-amber-500
    content = content.replace(/bg-zinc-100\/50 text-amber-500(?! dark:)/g, 'bg-zinc-100/50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed dark colors in:', filePath);
    }
  }
});
