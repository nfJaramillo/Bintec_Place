import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Blockchain4Bintec/',
main
: [react(), eslint()],
  define: {
    global: {},
    "process.env": {}
  },
  server:{
    port: 3000
  }
})
