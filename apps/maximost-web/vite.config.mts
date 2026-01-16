import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Resolve __dirname for ESM
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CACHE BUSTER: MISSION IMMUTABLE PHASE 2 - 1768438521
// https://vitejs.dev/config/
export default defineConfig({
  // Set the root to the client directory
  root: 'client',
  envDir: '..',
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      // Alias path resolved from project root (__dirname) to client/src
      '@': path.resolve(__dirname, './client/src'),
    },
  },
  build: {
    // The output directory is relative to the vite `root` directory ('client'),
    // so '../dist' resolves to ProjectRoot/dist
    outDir: '../dist',
    emptyOutDir: true,
  },
  // publicDir is relative to the project root (where vite.config.mts is).
  publicDir: 'public',
  server: {
    port: 5173,
    proxy: {
      '/api/backend': {
        target: 'https://maximost-api.onrender.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/backend/, ''),
      },
    },
  },
});
