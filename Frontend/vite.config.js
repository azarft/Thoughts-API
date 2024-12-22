import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Set the base path
  build: {
    rollupOptions: {
      input: '/index.html', // Entry file
    },
  },
  server: {
    fs: {
      strict: false,
    },
  },
});
