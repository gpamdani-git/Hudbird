const fs = require('fs');
let content = fs.readFileSync('packages/theme/src/index.js', 'utf8');

const keyframesMatch = content.indexOf('keyframes:');
if (keyframesMatch === -1) {
  content = content.replace(
    /extend: \{/,
    `extend: {
        keyframes: {
          shimmer: {
            '100%': { transform: 'translateX(100%)' },
          },
        },
        animation: {
          shimmer: 'shimmer 2s infinite',
        },`
  );
}

fs.writeFileSync('packages/theme/src/index.js', content);
