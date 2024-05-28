import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:666', // Cambia al puerto donde se ejecuta tu servidor backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
