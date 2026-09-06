#!/bin/bash

echo "🚀 Memulai otomatisasi instalasi Monorepo UI Library..."

# 1. Membuat struktur folder utama (Workspace)
echo "📁 Membuat direktori utama..."
mkdir -p packages/core/src/components/Button
mkdir -p packages/core/src/components/Input
mkdir -p packages/core/src/components/Card
mkdir -p packages/core/src/utils
mkdir -p packages/theme/src
mkdir -p apps/docs/app/components/button
mkdir -p apps/docs/app/components/input
mkdir -p apps/docs/app/components/card
mkdir -p apps/docs/public

# 2. Membuat Root package.json
echo "📄 Membuat Root package.json..."
cat << 'PACKAGE_JSON' > package.json
{
  "name": "my-ui-library-monorepo",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "^1.11.2"
  }
}
PACKAGE_JSON

# 3. Membuat konfigurasi Turborepo
echo "📄 Membuat turbo.json..."
cat << 'TURBO_JSON' > turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
TURBO_JSON

# 4. Membuat konfigurasi @my-lib/core
echo "📦 Mengkonfigurasi paket core..."
cat << 'CORE_PKG' > packages/core/package.json
{
  "name": "@my-lib/core",
  "version": "0.1.0",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.mts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  },
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch"
  },
  "dependencies": {
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1",
    "class-variance-authority": "^0.7.0"
  },
  "devDependencies": {
    "tsup": "^8.5.1",
    "typescript": "^5.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0"
  },
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18",
    "tailwindcss": ">=3.4.0"
  }
}
CORE_PKG

cat << 'CORE_TSUP' > packages/core/tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});
CORE_TSUP

cat << 'CORE_CN' > packages/core/src/utils/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
CORE_CN

cat << 'CORE_INDEX' > packages/core/src/index.ts
export * from './utils/cn';
CORE_INDEX

# 5. Membuat konfigurasi Docs (Next.js)
echo "🌐 Mengkonfigurasi situs dokumentasi (Next.js)..."
cat << 'DOCS_PKG' > apps/docs/package.json
{
  "name": "docs",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.1.5",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "@my-lib/core": "*"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.3",
    "autoprefixer": "^10.4.19"
  }
}
DOCS_PKG

cat << 'DOCS_POSTCSS' > apps/docs/postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
DOCS_POSTCSS

cat << 'DOCS_TAILWIND' > apps/docs/tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", 
    "../../packages/core/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: { 
    extend: { 
      colors: { 
        background: "hsl(var(--background))", 
        foreground: "hsl(var(--foreground))", 
        border: "hsl(var(--border))" 
      } 
    } 
  },
  plugins: [],
} satisfies Config;
DOCS_TAILWIND

cat << 'DOCS_TSCONFIG' > apps/docs/tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
DOCS_TSCONFIG

# Memberi izin eksekusi otomatis
chmod +x setup.sh

echo ""
echo "✅ SELESAI! File bash script setup.sh telah dibuat dan diperbarui."
echo "Untuk menginstal ulang atau mem-bootstrap proyek dari nol di lokal Anda,"
echo "cukup salin file setup.sh ini ke laptop Anda dan jalankan:"
echo "$ ./setup.sh"
echo "$ npm install"
echo "$ npm run dev"
