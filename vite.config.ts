import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function copyStaticAssetsPlugin() {
  return {
    name: 'copy-static-assets',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      if (!fs.existsSync(distDir)) return;

      // Copy script.js to dist/
      const scriptSrc = path.resolve(__dirname, 'script.js');
      if (fs.existsSync(scriptSrc)) {
        fs.copyFileSync(scriptSrc, path.resolve(distDir, 'script.js'));
      }

      // Copy style.css to dist/
      const styleSrc = path.resolve(__dirname, 'style.css');
      if (fs.existsSync(styleSrc)) {
        fs.copyFileSync(styleSrc, path.resolve(distDir, 'style.css'));
      }

      // Copy assets folder recursively
      const assetsSrc = path.resolve(__dirname, 'assets');
      const assetsDest = path.resolve(distDir, 'assets');
      if (fs.existsSync(assetsSrc)) {
        fs.cpSync(assetsSrc, assetsDest, { recursive: true });
      }
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), copyStaticAssetsPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

