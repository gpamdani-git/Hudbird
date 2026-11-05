import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createServer } from "vite";
import { chromium } from "@playwright/test";
const root = process.cwd();
const out = path.join(root, "output/playwright/landing-sections");
const sourceFile = path.join(out, "exported-App.tsx");
assert.ok(
  fs.existsSync(sourceFile),
  "Run scripts/verify-landing-builder.mjs first to capture the actual React export."
);
const exportedConfig = JSON.parse(fs.readFileSync(path.join(out, "exported-config.json"), "utf8"));
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "hudbird-landing-consumer-"));
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
const seen = new Set();
function walk(name) {
  if (seen.has(name)) return;
  assert.ok(registry[name], `Missing dependency ${name}`);
  seen.add(name);
  for (const dependency of registry[name].registryDependencies || []) walk(dependency);
}
walk("LandingPage");
const deps = [...new Set([...seen].flatMap((name) => registry[name].dependencies || []))];
const rootPackage = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const tools = [
  "react",
  "react-dom",
  "vite",
  "typescript",
  "@types/react",
  "@types/react-dom",
  "@vitejs/plugin-react",
  "@tailwindcss/vite",
  "tailwindcss",
];
fs.writeFileSync(
  path.join(fixture, "package.json"),
  JSON.stringify(
    {
      name: "hudbird-landing-consumer",
      private: true,
      type: "module",
      dependencies: Object.fromEntries(
        [...deps, ...tools].map((name) => [
          name,
          rootPackage.dependencies?.[name] || rootPackage.devDependencies?.[name] || "*",
        ])
      ),
    },
    null,
    2
  )
);
fs.symlinkSync(path.join(root, "node_modules"), path.join(fixture, "node_modules"), "dir");
fs.mkdirSync(path.join(fixture, "src"), { recursive: true });
fs.writeFileSync(
  path.join(fixture, "components.json"),
  JSON.stringify({
    tailwind: { version: 4, css: "src/index.css" },
    aliases: { components: "@/components/hudbird-ui" },
  })
);
fs.writeFileSync(path.join(fixture, "src/index.css"), '@import "tailwindcss";\n');
console.log(
  run("node", [path.join(fixture, "package/bin/index.js"), "add", "LandingPage", "--yes"])
);
assert.ok(fs.existsSync(path.join(fixture, ".agents/skills/hudbird-landing-sections/SKILL.md")));
assert.match(
  fs.readFileSync(path.join(fixture, "src/index.css"), "utf8"),
  /HeroSection\/theme.css/
);
for (const name of seen)
  for (const file of registry[name].files) {
    const content = fs.readFileSync(
      path.join(fixture, "src/components/hudbird-ui", name, file.name),
      "utf8"
    );
    assert.ok(!/@hudbird\//.test(content), `Workspace import in ${name}/${file.name}`);
  }
fs.copyFileSync(sourceFile, path.join(fixture, "src/App.tsx"));
fs.writeFileSync(
  path.join(fixture, "src/main.tsx"),
  `import * as React from 'react';import {createRoot} from 'react-dom/client';import App from './App';import './index.css';createRoot(document.getElementById('root')!).render(<App/>);`
);
fs.writeFileSync(
  path.join(fixture, "index.html"),
  '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Hudbird landing export</title></head><body style="margin:0"><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>'
);
fs.writeFileSync(
  path.join(fixture, "vite.config.ts"),
  `import {defineConfig} from 'vite';import react from '@vitejs/plugin-react';import tailwindcss from '@tailwindcss/vite';import path from 'node:path';export default defineConfig({plugins:[react(),tailwindcss()],resolve:{alias:{'@':path.resolve(import.meta.dirname,'src')}},server:{fs:{allow:[${JSON.stringify(fixture)},${JSON.stringify(path.join(root, "node_modules"))}]}}});`
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
      paths: { "@/*": ["./src/*"] },
    },
    include: ["src"],
  })
);
console.log(run(path.join(root, "node_modules/.bin/tsc"), ["--noEmit"]));
console.log(run(path.join(root, "node_modules/.bin/vite"), ["build"]));
const server = await createServer({
  root: fixture,
  configFile: path.join(fixture, "vite.config.ts"),
  server: { host: "127.0.0.1", port: 0 },
});
await server.listen();
const port = server.httpServer.address().port;
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.emulateMedia({ reducedMotion: "reduce" });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
try {
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(`http://127.0.0.1:${port}`, { waitUntil: "networkidle" });
    await page.getByRole("heading", { level: 1 }).waitFor();
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    assert.equal(
      await page.locator("[data-landing-page]").getAttribute("data-brand"),
      exportedConfig.brand.id
    );
    const order = await page
      .locator("[data-landing-section]")
      .evaluateAll((nodes) => nodes.map((node) => node.dataset.landingSection));
    assert.deepEqual(
      order,
      exportedConfig.sections.filter((section) => section.enabled).map((section) => section.type)
    );
    assert.ok(
      (await page.getByRole("button", { name: exportedConfig.brand.name, exact: true }).count()) ===
        0
    );
    assert.ok(
      (await page.getByRole("link", { name: exportedConfig.brand.name, exact: true }).count()) > 0
    );
    await page.screenshot({
      path: path.join(out, `installed-export-${width}.png`),
      fullPage: true,
    });
  }
  await page.getByRole("tab", { name: "Projects with a next step" }).click();
  assert.ok((await page.getByRole("tabpanel").innerText()).includes("Projects with a next step"));
  assert.deepEqual(errors, []);
  fs.writeFileSync(
    path.join(out, "install-results.json"),
    JSON.stringify(
      {
        fixture,
        archive,
        registryEntries: [...seen],
        npmDependencies: deps,
        dependencySource:
          "Existing installed dependencies reused via node_modules symlink; no network install was performed.",
        actualBuilderExport: true,
        typecheck: "passed",
        productionBuild: "passed",
        viewportChecks: [375, 768, 1024, 1440],
        orderAndVisibility: "match exported JSON",
        features: "passed",
        errors,
      },
      null,
      2
    )
  );
  console.log(
    `Packed CLI and actual exported App.tsx passed standalone typecheck, build, viewport/order checks, and feature interaction in ${fixture}`
  );
} finally {
  await browser.close();
  await server.close();
}
