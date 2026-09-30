const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace(
  '--dyn-primary-600: oklch(0.53 calc(var(--primary-c, 0.26) * 1) var(--primary-h, 276));',
  '--dyn-primary-600: oklch(0.53 calc(var(--primary-c) * 1) var(--primary-h));'
);

fs.writeFileSync('src/index.css', css);
