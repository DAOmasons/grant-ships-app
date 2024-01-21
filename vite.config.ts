import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: { exportType: 'default', ref: true },
      include: '**/*.svg',
    }),
  ],
  define: {
    'process.env': {
      PACKAGE_VERSION: pkg.version,
    },
  },
});
