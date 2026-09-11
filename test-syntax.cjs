const primaryForeground = "0 0% 100%";
let name = "warning";
let baseLvl = 500;
let hoverLvl = 600;
let activeLvl = 700;
let isWarning = true;
let functionalLight = `
  --${name}: var(--${name}-${baseLvl});
  --${name}-hover: var(--${name}-${hoverLvl});
  --${name}-active: var(--${name}-${activeLvl});
  --${name}-foreground: ${name === 'primary' ? primaryForeground : (isWarning ? '240 5.9% 10%' : '0 0% 100%')};
  --${name}-soft: hsl(var(--${name}-50));
  --${name}-soft-hover: hsl(var(--${name}-100));
  --${name}-soft-active: hsl(var(--${name}-200));
  --${name}-border: hsl(var(--${name}-${baseLvl}));
  --${name}-border-soft: hsl(var(--${name}-200));
  --${name}-text: hsl(var(--${name}-700));
  --${name}-text-soft: hsl(var(--${name}-${baseLvl}));\n`;
console.log(functionalLight);
