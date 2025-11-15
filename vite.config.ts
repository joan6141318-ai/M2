import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This configuration makes the environment variable available to the client-side code.
    // Vercel exposes environment variables prefixed with `VITE_` to the build process.
    // This line replaces `process.env.API_KEY` in the source code with the actual
    // value of `VITE_API_KEY` at build time.
    'process.env.API_KEY': JSON.stringify(process.env.VITE_API_KEY),
  },
});
