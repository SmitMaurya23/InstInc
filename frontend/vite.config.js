import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ensure this is set correctly for root deployment on Render
  base: '/', // This tells Vite to generate absolute paths like /assets/index-xxxxxxxx.js
  build: {
    outDir: 'dist', // The directory where your built files go
  },
});