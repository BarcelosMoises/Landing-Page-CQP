import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { viteStaticCopy } from 'vite-plugin-static-copy';

/**
 * Vite config — CQP Landing Page
 *
 * Os assets originais (images/, video/) ficam na raiz do repo
 * junto com o index.html Bootstrap preservado.
 * vite-plugin-static-copy copia essas pastas para dist/ no build
 * sem precisar movê-las ou duplicar arquivos pesados.
 *
 * Regras:
 *   - publicDir: 'public'  ← nunca '.', evita copiar index.html Bootstrap
 *   - Entry point: app.html na raiz  ← Vite processa src/main.tsx daqui
 */
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: 'images', dest: '.' },   // raiz/images/ → dist/images/
        { src: 'video',  dest: '.' },   // raiz/video/  → dist/video/
      ],
    }),
  ],

  publicDir: 'public',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
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
    open: '/app.html',
    // No dev server, servir images/ e video/ da raiz
    fs: {
      allow: ['.'],
    },
  },

  preview: {
    port: 4173,
  },
});
