import { defineConfig } from 'vite';

export default defineConfig({
  base: '/dist/',
	server: {
    port: 5173,
    open: true
  }
});