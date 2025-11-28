import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {},
  optimizeDeps: {
    exclude: ['package-that-is-not-updating', '@kaibanjs/workflow'],
    include: ['p-queue', 'kaibanjs'],
    esbuildOptions: {
      target: 'esnext',
    },
  },
});
