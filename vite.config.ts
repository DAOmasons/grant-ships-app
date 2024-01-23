import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      protocolImports: true,
    }),
    svgr({
      svgrOptions: { exportType: 'default', ref: true },
      include: '**/*.svg',
    }),
  ],
  define: {
    // globalThis: 'window',
    'process.env': {
      PACKAGE_VERSION: pkg.version,
    },
    // window: 'window',
    // globalThis: {},
  },
});
