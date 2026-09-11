const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const docsDir = path.join(__dirname, 'apps/docs/src/pages');

walkDir(docsDir, function(filePath) {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Regex to match the breadcrumbs block
    const regex = /\{\/\*\s*Header section with breadcrumbs and description\s*\*\/\}[\s\S]*?(?=\s*<div className="mx-auto w-full space-y-8)/g;
    
    if (regex.test(content)) {
      content = content.replace(regex, '');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    } else {
        // sometimes the next div doesn't have exactly mx-auto w-full space-y-8
        const fallbackRegex = /\s*\{\/\*\s*Header section with breadcrumbs and description\s*\*\/\}[\s\S]*?<\/div>\s*<\/div>\s*(?=<div)/g;
        if (fallbackRegex.test(content)) {
            content = content.replace(fallbackRegex, '');
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated (fallback regex) ${filePath}`);
        }
    }
  }
});
