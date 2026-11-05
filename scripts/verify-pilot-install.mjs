import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";

const root = process.cwd();
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "hudbird-startup-pilot-"));
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
const registry = JSON.parse(
  fs.readFileSync(path.join(fixture, "package/templates/registry.json"), "utf8")
);
const visited = new Set();
function collect(name) {
  if (visited.has(name)) return;
  assert.ok(registry[name], `Missing dependency ${name}`);
  visited.add(name);
  for (const dep of registry[name].registryDependencies || []) collect(dep);
}
collect("StartupPilot");
const deps = [...new Set([...visited].flatMap((name) => registry[name].dependencies || []))];
const rootPackage = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
fs.writeFileSync(
  path.join(fixture, "package.json"),
  JSON.stringify(
    {
      name: "hudbird-pilot-consumer",
      private: true,
      type: "module",
      dependencies: Object.fromEntries(
        [
          ...deps,
          "react",
          "react-dom",
          "vite",
          "typescript",
          "@types/react",
          "@types/react-dom",
          "@vitejs/plugin-react",
          "@tailwindcss/vite",
          "tailwindcss",
        ].map((name) => [
          name,
          rootPackage.dependencies?.[name] || rootPackage.devDependencies?.[name] || "*",
        ])
      ),
    },
    null,
    2
  )
);
fs.mkdirSync(path.join(fixture, "src"), { recursive: true });
fs.symlinkSync(path.join(root, "node_modules"), path.join(fixture, "node_modules"), "dir");
fs.writeFileSync(
  path.join(fixture, "components.json"),
  JSON.stringify({
    tailwind: { version: 4, css: "src/index.css" },
    aliases: { components: "@/components/hudbird-ui" },
  })
);
fs.writeFileSync(
  path.join(fixture, "src/index.css"),
  '@import "tailwindcss";\n:root { --primary: #9333ea; --primary-foreground: #ffffff; }\n@custom-variant dark (&:is(.dark, .dark *):not(:is([data-hb-theme="light"], [data-hb-theme="light"] *)));\n'
);
console.log(
  run("node", [path.join(fixture, "package/bin/index.js"), "add", "StartupPilot", "--yes"])
);
const css = fs.readFileSync(path.join(fixture, "src/index.css"), "utf8");
assert.match(css, /HeroSection\/theme.css/);
assert.ok(fs.existsSync(path.join(fixture, ".agents/skills/hudbird-startup-pilot/SKILL.md")));
for (const name of visited)
  for (const file of registry[name].files) {
    const content = fs.readFileSync(
      path.join(fixture, "src/components/hudbird-ui", name, file.name),
      "utf8"
    );
    assert.ok(!/@hudbird\//.test(content), `Internal package reference in ${name}/${file.name}`);
  }
fs.writeFileSync(
  path.join(fixture, "src/App.tsx"),
  `import * as React from 'react';\nimport { StartupPage, pilotBrands, pilotCompositions, startupContent, pilotHeroes } from './components/hudbird-ui/StartupPilot';\nconst params = new URLSearchParams(location.search);\nconst hero = pilotHeroes[params.get('hero') as keyof typeof pilotHeroes] ?? pilotHeroes.split;\nexport default function App(){return <>{params.has("host") && <div data-host-theme className="bg-primary">Host theme fixture</div>}<StartupPage brand={pilotBrands[0]} composition={{...pilotCompositions[0],hero}} content={startupContent} /></>}`
);
fs.writeFileSync(
  path.join(fixture, "src/main.tsx"),
  `import * as React from 'react';import {createRoot} from 'react-dom/client';import App from './App';import './index.css';createRoot(document.getElementById('root')!).render(<App/>);`
);
fs.writeFileSync(
  path.join(fixture, "index.html"),
  '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Hudbird pilot consumer</title></head><body style="margin:0"><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>'
);
fs.writeFileSync(
  path.join(fixture, "vite.config.ts"),
  `import {defineConfig} from 'vite';import react from '@vitejs/plugin-react';import tailwindcss from '@tailwindcss/vite';export default defineConfig({plugins:[react(),tailwindcss()],server:{fs:{allow:[${JSON.stringify(fixture)},${JSON.stringify(path.join(root, "node_modules"))}]}}});`
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
      esModuleInterop: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      types: ["vite/client"],
    },
    include: ["src"],
  })
);
console.log(run(path.join(root, "node_modules/.bin/tsc"), ["--noEmit"]));
console.log(run(path.join(root, "node_modules/.bin/vite"), ["build"]));
fs.mkdirSync(path.join(root, "output/playwright/startup-pilot"), { recursive: true });
fs.writeFileSync(
  path.join(root, "output/playwright/startup-pilot/install.json"),
  JSON.stringify(
    {
      fixture,
      archive,
      components: [...visited],
      npmDependencies: deps,
      dependencySource:
        "Existing installed dependencies reused via node_modules symlink; no network install performed.",
      typecheck: "passed",
      build: "passed",
    },
    null,
    2
  )
);
console.log(
  `Verified packed CLI source installation, skill, theme injection, typecheck, and Vite production build in ${fixture}`
);

if (process.argv.includes("--browser")) {
  const { createServer } = await import("vite");
  const { chromium } = await import("@playwright/test");
  const server = await createServer({
    root: fixture,
    configFile: path.join(fixture, "vite.config.ts"),
    server: { host: "127.0.0.1", port: 0 },
  });
  await server.listen();
  const port = server.httpServer.address().port;
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  let checks = 0;
  try {
    for (const hero of ["centered", "split", "slideshow", "video", "interactive"])
      for (const width of [375, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.goto(`http://127.0.0.1:${port}/?hero=${hero}`, { waitUntil: "networkidle" });
        await page.getByRole("heading", { level: 1 }).waitFor();
        const layout = await page.evaluate(() => ({
          scroll: document.documentElement.scrollWidth,
          background: getComputedStyle(document.querySelector("[data-brand]")).backgroundColor,
          primary: getComputedStyle(document.querySelector("main .hb-primary")).backgroundColor,
          foreground: getComputedStyle(document.querySelector("main .hb-primary")).color,
        }));
        assert.ok(layout.scroll <= width + 1, JSON.stringify(layout));
        assert.equal(layout.background, "rgb(255, 255, 255)");
        assert.equal(layout.primary, "rgb(36, 87, 214)");
        assert.equal(layout.foreground, "rgb(255, 255, 255)");
        if (hero === "split")
          await page.screenshot({
            path: path.join(root, `output/playwright/startup-pilot/consumer-${width}.png`),
            fullPage: true,
          });
        checks++;
      }
    await page.getByRole("tab", { name: "Notes" }).first().click();
    assert.equal(
      await page.getByRole("tab", { name: "Notes" }).first().getAttribute("aria-selected"),
      "true"
    );
    await page.goto(`http://127.0.0.1:${port}/?host=1`, { waitUntil: "networkidle" });
    assert.equal(
      await page
        .locator("[data-host-theme]")
        .evaluate((node) => getComputedStyle(node).backgroundColor),
      "rgb(147, 51, 234)"
    );
    assert.equal(
      await page
        .locator("main .hb-primary")
        .first()
        .evaluate((node) => getComputedStyle(node).backgroundColor),
      "rgb(36, 87, 214)"
    );
    assert.deepEqual(errors, []);
    fs.writeFileSync(
      path.join(root, "output/playwright/startup-pilot/consumer-browser.json"),
      JSON.stringify({ checks, errors, styles: "passed", tabs: "passed" }, null, 2)
    );
    console.log(`Independent consumer passed ${checks} browser layout/style checks and demo tabs.`);
  } finally {
    await browser.close();
    await server.close();
  }
}
