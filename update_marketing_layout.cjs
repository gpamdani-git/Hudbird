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

const docsDir = path.join(__dirname, 'apps/docs/src/pages/marketing');

const target1 = '<div className="flex w-full flex-col pb-20">';
const replacement1 = '<div className="flex w-full flex-col items-center pb-24 pt-24">';

const target2 = '<div className="mx-auto w-full space-y-8 px-4 sm:px-8">';
const replacement2 = '<div className="mx-auto w-full max-w-7xl space-y-8 px-4 sm:px-8 lg:px-12">';

walkDir(docsDir, function(filePath) {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    let updated = false;
    
    if (content.includes(target1)) {
        content = content.replace(target1, replacement1);
        updated = true;
    }
    
    if (content.includes(target2)) {
        content = content.replace(target2, replacement2);
        updated = true;
    }
    
    if (updated) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${filePath}`);
    }
  }
});
