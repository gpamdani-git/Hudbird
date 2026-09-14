import fs from "fs";
import { parseOklch, generateOklchScale } from "../apps/docs/src/lib/colorUtils";

const colors = {
  primary: "0.511 0.262 276.966", // Indigo
  secondary: "0.96 0.01 240", // Zinc 100 approx
  success: "0.696 0.17 162.48", // Emerald
  info: "0.685 0.169 237.323", // Sky
  warning: "0.769 0.188 70.08", // Amber
  destructive: "0.546 0.245 26.284", // Rose
};

let scalesCss = "";
for (const [name, oklchStr] of Object.entries(colors)) {
  const { c, h } = parseOklch(oklchStr);
  const scale = generateOklchScale(c, h);
  for (const [k, v] of Object.entries(scale)) {
    scalesCss += `    --${name}-${k}: ${v};\n`;
  }
}

let functionalLight = "";
let functionalDark = "";
for (const name of Object.keys(colors)) {
  const isWarning = name === "warning";
  const baseLvl = isWarning ? 500 : 600;
  const hoverLvl = isWarning ? 600 : 700;
  const activeLvl = isWarning ? 700 : 800;

  functionalLight += `
    --${name}: var(--${name}-${baseLvl});
    --${name}-hover: var(--${name}-${hoverLvl});
    --${name}-active: var(--${name}-${activeLvl});
    --${name}-foreground: 0 0% 100%;
    --${name}-soft: oklch(var(--${name}-50));
    --${name}-soft-hover: oklch(var(--${name}-100));
    --${name}-soft-active: oklch(var(--${name}-200));
    --${name}-border: oklch(var(--${name}-${baseLvl}));
    --${name}-border-soft: oklch(var(--${name}-200));
    --${name}-text: oklch(var(--${name}-700));
    --${name}-text-soft: oklch(var(--${name}-${baseLvl}));
`;

  functionalDark += `
    --${name}: var(--${name}-${baseLvl});
    --${name}-hover: var(--${name}-${hoverLvl});
    --${name}-active: var(--${name}-${activeLvl});
    --${name}-foreground: 0 0% 100%;
    --${name}-soft: color-mix(in oklab, oklch(var(--${name}-${baseLvl})) 15%, transparent);
    --${name}-soft-hover: color-mix(in oklab, oklch(var(--${name}-${baseLvl})) 25%, transparent);
    --${name}-soft-active: color-mix(in oklab, oklch(var(--${name}-${baseLvl})) 35%, transparent);
    --${name}-border: var(--${name}-${baseLvl});
    --${name}-border-soft: color-mix(in oklab, oklch(var(--${name}-${baseLvl})) 30%, transparent);
    --${name}-text: var(--${name}-300);
    --${name}-text-soft: var(--${name}-400);
`;
}

functionalLight = functionalLight.replace(
  "--secondary-foreground: 0 0% 100%;",
  "--secondary-foreground: 240 5.9% 10%;"
);
functionalLight = functionalLight.replace(
  "--warning-foreground: 0 0% 100%;",
  "--warning-foreground: 240 5.9% 10%;"
);

const themeBlock = `
@theme {
  --radius: var(--theme-radius, 0.5rem);
  --radius-sm: calc(var(--theme-radius, 0.5rem) - 4px);
  --radius-md: calc(var(--theme-radius, 0.5rem) - 2px);
  --radius-lg: var(--theme-radius, 0.5rem);
  --radius-xl: calc(var(--theme-radius, 0.5rem) + 4px);
  --radius-2xl: calc(var(--theme-radius, 0.5rem) + 8px);
  --radius-3xl: calc(var(--theme-radius, 0.5rem) + 12px);
  
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));

  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));

  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));

  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));

  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));

  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: oklch(var(--ring));

${Object.keys(colors)
  .map(
    (name) => `
  --color-${name}: oklch(var(--${name}));
  --color-${name}-hover: oklch(var(--${name}-hover));
  --color-${name}-active: oklch(var(--${name}-active));
  --color-${name}-foreground: ${name === "secondary" || name === "warning" ? "hsl(var(--" + name + "-foreground))" : "hsl(var(--" + name + "-foreground))"};
  --color-${name}-soft: var(--${name}-soft);
  --color-${name}-soft-hover: var(--${name}-soft-hover);
  --color-${name}-soft-active: var(--${name}-soft-active);
  --color-${name}-border: var(--${name}-border);
  --color-${name}-border-soft: var(--${name}-border-soft);
  --color-${name}-text: var(--${name}-text);
  --color-${name}-text-soft: var(--${name}-text-soft);
  
${[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((k) => `  --color-${name}-${k}: oklch(var(--${name}-${k}));`).join("\n")}
`
  )
  .join("")}

  --font-sans: var(--theme-font-sans, var(--font-sans)), ui-sans-serif, system-ui, sans-serif;
  --font-heading: var(--theme-font-heading, var(--theme-font-sans, var(--font-sans))), ui-sans-serif, system-ui, sans-serif;

  --color-chart-1: hsl(var(--chart-1));
  --color-chart-2: hsl(var(--chart-2));
  --color-chart-3: hsl(var(--chart-3));
  --color-chart-4: hsl(var(--chart-4));
  --color-chart-5: hsl(var(--chart-5));
}
`;

const indexCss = `
@import "tailwindcss";
@source "../../../packages";
@custom-variant dark (&:is(.dark *));

${themeBlock}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 243 75% 59%;
    --theme-radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;

${scalesCss}
${functionalLight}
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 243 75% 59%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;

${functionalDark}
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-sans;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
}
`;

fs.writeFileSync("./apps/docs/src/index.css", indexCss);
console.log("index.css generated successfully!");
