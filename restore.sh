mkdir -p src apps/docs/app/components/button packages/core/src/components/Button packages/theme/src

# root package.json
cat << 'PKG' > package.json
{
  "name": "my-ui-library-monorepo",
  "private": true,
  "workspaces": [
    "packages/*",
    "apps/*"
  ],
  "version": "0.0.0",
  "scripts": {
    "build": "vite build && turbo run build",
    "dev": "turbo run dev",
    "lint": "tsc --noEmit && turbo run lint"
  },
  "dependencies": {
    "@google/genai": "^2.4.0",
    "@tailwindcss/vite": "^4.1.14",
    "@vitejs/plugin-react": "^5.0.4",
    "dotenv": "^17.2.3",
    "express": "^4.21.2",
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "vite": "^6.2.3"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^22.14.0",
    "autoprefixer": "^10.4.21",
    "esbuild": "^0.25.0",
    "tailwindcss": "^4.1.14",
    "tsx": "^4.21.0",
    "typescript": "^5.0.0",
    "eslint": "^9.0.0",
    "tsup": "^8.5.1",
    "turbo": "^1.13.0"
  }
}
PKG

cat << 'VITE' > vite.config.ts
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: { alias: { '@': path.resolve(__dirname, '.') } },
    server: { port: 3001, host: '0.0.0.0' }
  };
});
VITE

cat << 'TURBO' > turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**", ".next/**"] },
    "lint": { "dependsOn": ["^lint"] },
    "dev": { "cache": false, "persistent": true }
  }
}
TURBO

cat << 'TSCONFIG' > tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
TSCONFIG

# apps/docs
cat << 'DOCSPKG' > apps/docs/package.json
{
  "name": "docs",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "15.1.0",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "@my-lib/core": "*",
    "@my-lib/theme": "*"
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
DOCSPKG

cat << 'COREPKG' > packages/core/package.json
{
  "name": "@my-lib/core",
  "version": "0.1.0",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "lint": "eslint \"src/**/*.ts*\""
  },
  "dependencies": {
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1",
    "class-variance-authority": "^0.7.0",
    "@my-lib/theme": "*"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0"
  },
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18",
    "tailwindcss": ">=3.4.0"
  }
}
COREPKG

cat << 'THEMEPKG' > packages/theme/package.json
{
  "name": "@my-lib/theme",
  "version": "0.1.0",
  "main": "src/index.js",
  "dependencies": {
    "tailwindcss": "^4.1.14"
  }
}
THEMEPKG

