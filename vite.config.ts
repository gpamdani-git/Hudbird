import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './apps/docs/src'),
        '@hudbird/ui': path.resolve(__dirname, './packages/core/src'),
        '@hudbird/theme': path.resolve(__dirname, './packages/theme/src'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      strictPort: true,
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'lucide-react',
        'clsx',
        'tailwind-merge',
        'class-variance-authority',
      ],
    },
  };
});
