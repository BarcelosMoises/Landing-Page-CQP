import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * Vite config — CQP Landing Page
 *
 * publicDir: 'public' — pasta dedicada para assets estáticos.
 * Os arquivos images/ e video/ do protótipo original precisam ser
 * copiados (ou linkados) para public/images/ e public/video/
 * para ficarem disponíveis no build.
 *
 * IMPORTANTE: NÃO usar publicDir: '.' pois isso copiaria o
 * index.html original (301 KB Bootstrap) para dist/, sobrescrevendo
 * o app React.
 */
export default defineConfig({
  plugins: [react()],

  // Pasta de assets estáticos — copiados para dist/ sem hash
  publicDir: 'public',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    // Vite usa public/index.html como entry point padrão
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      // Entry point explícito: public/index.html
      input: path.resolve(__dirname, 'public/index.html'),
    },
  },

  server: {
    port: 5173,
    open: '/',
  },

  preview: {
    port: 4173,
  },
});
