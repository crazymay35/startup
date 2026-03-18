import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4000', // Changed 'localhost' to '127.0.0.1'
        changeOrigin: true,
        secure: false,
      },
    },
  },
});