const fs = require('fs');

let file = fs.readFileSync('scripts/generate-index.ts', 'utf8');

file = file.replace(/--color-\$\{name\}: hsl\(var\(--\$\{name\}\)\);/g, '--color-${name}: var(--${name});');
file = file.replace(/--color-\$\{name\}-hover: hsl\(var\(--\$\{name\}-hover\)\);/g, '--color-${name}-hover: var(--${name}-hover);');
file = file.replace(/--color-\$\{name\}-active: hsl\(var\(--\$\{name\}-active\)\);/g, '--color-${name}-active: var(--${name}-active);');
file = file.replace(/--color-\$\{name\}-foreground: hsl\(var\(--\$\{name\}-foreground\)\);/g, '--color-${name}-foreground: var(--${name}-foreground);');
file = file.replace(/--color-\$\{name\}-border: hsl\(var\(--\$\{name\}-border\)\);/g, '--color-${name}-border: var(--${name}-border);');
file = file.replace(/--color-\$\{name\}-text: hsl\(var\(--\$\{name\}-text\)\);/g, '--color-${name}-text: var(--${name}-text);');
file = file.replace(/--color-\$\{name\}-text-soft: hsl\(var\(--\$\{name\}-text-soft\)\);/g, '--color-${name}-text-soft: var(--${name}-text-soft);');

fs.writeFileSync('scripts/generate-index.ts', file);
