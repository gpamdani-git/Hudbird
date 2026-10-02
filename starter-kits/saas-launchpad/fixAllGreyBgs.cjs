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
  path.join(__dirname, 'src/components')
];

targetDirs.forEach(dir => {
  walkDir(dir, function(filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let original = content;
      
      // Replace bg-zinc-200/50 with bg-zinc-100/50
      // but only if it's exactly "bg-zinc-200/50", not part of another class like "selection:bg-zinc-200/50"
      content = content.replace(/(?<![:\w-])bg-zinc-200\/50/g, 'bg-zinc-100/50');
      
      if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed grey bg in:', filePath);
      }
    }
  });
});
