const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const targetDirs = [
  path.join(__dirname, 'src/pages'),
  path.join(__dirname, 'src/components/marketing')
];

targetDirs.forEach(dir => {
  walkDir(dir, function(filePath) {
    if (filePath.endsWith('.tsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let original = content;
      
      // Replace bg-zinc-200/50 with bg-zinc-100/50 ONLY when it's part of a blur/glow
      // Meaning it's followed or preceded by blur-[
      content = content.replace(/bg-zinc-200\/50\s+(.*?)blur-\[/g, 'bg-zinc-100/50 $1blur-[');
      content = content.replace(/blur-\[(.*?)\]\s+bg-zinc-200\/50/g, 'blur-[$1] bg-zinc-100/50');
      // Also catch dark:bg-blue... blur-[
      content = content.replace(/bg-zinc-200\/50(\s+dark:bg-[^\s]+)?\s+blur-\[/g, 'bg-zinc-100/50$1 blur-[');
      
      if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed glow in:', filePath);
      }
    }
  });
});
