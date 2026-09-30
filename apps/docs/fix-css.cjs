const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// Remove the badly placed :root block
css = css.replace(/:root \{\n\s{2}--dyn-primary-600:[^}]+\}\n/g, '');

// Find where to insert it (after @custom-variant dark)
const insertionPoint = '@custom-variant dark (&:is(.dark *));\n';
if (css.includes(insertionPoint)) {
  css = css.replace(insertionPoint, insertionPoint + `
:root {
  --dyn-primary-600: oklch(0.53 calc(var(--primary-c, 0.26) * 1) var(--primary-h, 276));
}
`);
}

fs.writeFileSync('src/index.css', css);
