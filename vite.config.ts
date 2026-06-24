import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * Vite config — CQP Landing Page
 *
 * Todas as imagens e vídeos ficam em public/ e são servidos
 * diretamente pelo Vite via publicDir sem necessidade de plugin extra.
 *
 * Regras:
 *   - publicDir: 'public'  ← copia public/ inteiro para dist/
 *   - Entry point: index.html na raiz  ← gera dist/index.html
 */
export default defineConfig({
  plugins: [
    react(),
  ],

  publicDir: 'public',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    chunkSizeWarningLimit: 600,
  },

  server: {
    port: 5173,
    open: true,
    fs: {
      allow: ['.'],
    },
  },

  preview: {
    port: 4173,
  },
});
