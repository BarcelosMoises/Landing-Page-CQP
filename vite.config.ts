import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * Vite config — CQP Landing Page
 *
 * publicDir aponta para a raiz do repositório para que
 * /images/ e /video/ (do protótipo original) sejam servidos
 * diretamente sem precisar copiar os assets.
 *
 * Em produção (build), os assets em public/ são copiados para dist/
 * sem hash — ideal para caminhos como /video/background-video.mp4
 */
export default defineConfig({
  plugins: [react()],

  // Serve os assets originais (images/, video/) como arquivos estáticos
  publicDir: '.',

  resolve: {
    alias: {
      // '@/components/...' → 'src/components/...'
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Entry point customizado (evita conflito com index.html original da main)
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index-app.html'),
    },
    outDir: 'dist',
    sourcemap: false,
    // Divide vendor (react) do código da aplicação
    chunkSizeWarningLimit: 600,
  },

  server: {
    port: 5173,
    open: '/index-app.html',
  },

  preview: {
    port: 4173,
  },
});
