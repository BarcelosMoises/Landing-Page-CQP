import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * Vite config — CQP Landing Page
 *
 * REGRA FUNDAMENTAL DO VITE:
 * O HTML entry point DEVE estar na raiz do projeto para que
 * o Vite resolva imports relativos a src/ (ex: /src/main.tsx).
 * Arquivos em public/ são copiados como assets estáticos puros
 * — o Vite não processa scripts dentro deles.
 *
 * Estrutura:
 *   app.html          ← entry point (raiz) — Vite bundla src/main.tsx
 *   public/           ← assets estáticos (copiados para dist/ sem hash)
 *   index.html        ← protótipo Bootstrap original (preservado, ignorado pelo build)
 */
export default defineConfig({
  plugins: [react()],

  // Assets estáticos: images/, video/, favicon etc.
  // NUNCA usar publicDir: '.' — copiaria o index.html Bootstrap para dist/
  publicDir: 'public',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    // Entry point na raiz do projeto
    rollupOptions: {
      input: path.resolve(__dirname, 'app.html'),
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    chunkSizeWarningLimit: 600,
  },

  server: {
    port: 5173,
    // Abre app.html no dev (não o index.html Bootstrap)
    open: '/app.html',
  },

  preview: {
    port: 4173,
  },
});
