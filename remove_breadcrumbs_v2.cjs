const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

const docsDir = path.join(__dirname, 'apps/docs/src/pages');

walkDir(docsDir, function(filePath) {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    const startStr = '<div className="sticky top-14';
    const endStr = '<div className="mx-auto w-full';
    
    if (content.includes(startStr) && content.includes(endStr)) {
        const startIndex = content.indexOf(startStr);
        const endIndex = content.indexOf(endStr, startIndex);
        
        if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
            content = content.slice(0, startIndex) + content.slice(endIndex);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    }
  }
});
