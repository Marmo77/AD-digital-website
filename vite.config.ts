import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// Wczytywanie zmiennych środowiskowych z pliku .env.datas
dotenv.config({ path: path.resolve(__dirname, '.env.datas') });

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), ViteImageOptimizer({
      jpg: { quality: 75, },
      jpeg: { quality: 75, },
      png: { quality: 75, },
      webp: { quality: 80 },
      avif: { quality: 65 },

    })],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    define: {
      'process.env.REACT_APP_WEBSITE_ID': JSON.stringify(process.env.REACT_APP_WEBSITE_ID),
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
