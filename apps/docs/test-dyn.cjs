const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// replace the @theme primary-600
css = css.replace(
  '--color-primary-600: oklch(0.53 calc(var(--primary-c, 0.26) * 1) var(--primary-h, 276));',
  '--color-primary-600: var(--dyn-primary-600);'
);

if (!css.includes('--dyn-primary-600')) {
  css = `
:root {
  --dyn-primary-600: oklch(0.53 calc(var(--primary-c, 0.26) * 1) var(--primary-h, 276));
}
` + css;
}

fs.writeFileSync('src/index.css', css);
