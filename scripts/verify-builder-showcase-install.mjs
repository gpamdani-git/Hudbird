import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "hudbird-builder-showcase-"));
const run = (file, args, cwd = fixture) =>
  execFileSync(file, args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });

run("node", ["packages/cli/scripts/build-registry.js"], root);
const archive = JSON.parse(
  run(
    "npm",
    [
      "pack",
      "--ignore-scripts",
      "--json",
      "--cache",
      path.join(fixture, "npm-cache"),
      "--pack-destination",
      fixture,
    ],
    path.join(root, "packages/cli")
  )
)[0].filename;
run("tar", ["-xzf", path.join(fixture, archive), "-C", fixture]);

fs.mkdirSync(path.join(fixture, "src"), { recursive: true });
fs.writeFileSync(
  path.join(fixture, "components.json"),
  JSON.stringify({
    tailwind: { version: 4, css: "src/index.css" },
    aliases: { components: "@/components/hudbird-ui" },
  })
);
fs.writeFileSync(path.join(fixture, "src/index.css"), '@import "tailwindcss";\n');
fs.symlinkSync(path.join(root, "node_modules"), path.join(fixture, "node_modules"), "dir");

const rootPackage = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const dependencies = Object.fromEntries(
  [
    "react",
    "react-dom",
    "vite",
    "typescript",
    "@types/react",
    "@types/react-dom",
    "@vitejs/plugin-react",
    "@tailwindcss/vite",
    "tailwindcss",
    "framer-motion",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
  ].map((name) => [
    name,
    rootPackage.dependencies?.[name] || rootPackage.devDependencies?.[name] || "*",
  ])
);
fs.writeFileSync(
  path.join(fixture, "package.json"),
  JSON.stringify({ name: "hudbird-builder-showcase", private: true, type: "module", dependencies })
);

console.log(
  run("node", [
    path.join(fixture, "package/bin/index.js"),
    "add",
    "LandingBuilderShowcase",
    "--yes",
  ])
);
const installed = path.join(fixture, "src/components/hudbird-ui/LandingBuilderShowcase");
assert.ok(fs.existsSync(path.join(installed, "index.tsx")));
assert.ok(fs.existsSync(path.join(installed, "showcase.css")));
assert.ok(!fs.existsSync(path.join(installed, "demo.ts")));

fs.writeFileSync(
  path.join(fixture, "src/App.tsx"),
  `import { LandingBuilderShowcase } from "./components/hudbird-ui/LandingBuilderShowcase";
import type { BrandProfile, HeroContent } from "./components/hudbird-ui/CompositionSchema";

const brand: BrandProfile = { id: "consumer", name: "Consumer", primary: "#2457d6", fontFamily: "sans-serif", radius: "soft", density: "comfortable", mode: "light" };
const content: HeroContent = { title: "A consumer hero", description: "Installed from the Hudbird registry.", primaryAction: { label: "Start", href: "#start" } };
const image = { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E", alt: "Preview" };
const variants = [
  { id: "centered", label: "Centered", description: "Centered layout", config: { variant: "centered" as const, image } },
  { id: "split", label: "Split", description: "Split layout", config: { variant: "split" as const, image } },
];

export default function App() {
  return <LandingBuilderShowcase brand={brand} content={content} variants={variants} initialVariant="split" builderHref="/builder" />;
}`
);
fs.writeFileSync(
  path.join(fixture, "src/main.tsx"),
  `import { createRoot } from "react-dom/client"; import App from "./App"; import "./index.css"; createRoot(document.getElementById("root")!).render(<App />);`
);
fs.writeFileSync(
  path.join(fixture, "index.html"),
  '<!doctype html><html><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>'
);
fs.writeFileSync(
  path.join(fixture, "vite.config.ts"),
  `import { defineConfig } from "vite"; import react from "@vitejs/plugin-react"; import tailwind from "@tailwindcss/vite"; export default defineConfig({ plugins: [react(), tailwind()] });`
);
fs.writeFileSync(
  path.join(fixture, "tsconfig.json"),
  JSON.stringify({
    compilerOptions: {
      target: "ES2022",
      lib: ["ES2022", "DOM", "DOM.Iterable"],
      jsx: "react-jsx",
      module: "ESNext",
      moduleResolution: "bundler",
      strict: true,
      skipLibCheck: true,
      noEmit: true,
    },
    include: ["src"],
  })
);

run(path.join(root, "node_modules/.bin/tsc"), ["--noEmit"]);
run(path.join(root, "node_modules/.bin/vite"), ["build"]);
console.log(`LandingBuilderShowcase passed packed CLI install, typecheck, and Vite build in ${fixture}`);
