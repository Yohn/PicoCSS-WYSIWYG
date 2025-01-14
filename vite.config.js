import { defineConfig } from 'vite';

export default defineConfig({
  base: '/dist/',
  outDir: 'docs',
	server: {
    port: 5173,
    open: true
  }
});