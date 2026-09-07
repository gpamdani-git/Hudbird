import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@hudbird/ui': path.resolve(__dirname, '../../packages/core/src'),
      '@my-lib/theme': path.resolve(__dirname, '../../packages/theme/src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
  }
})
