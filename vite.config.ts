import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import dts from 'vite-plugin-dts';
const pkg = require("./package.json");
const name = pkg.name;
const depexternals = Object.keys(pkg.dependencies || {});
const peerexternals = Object.keys(pkg.peerDependencies || {});
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: name,
      fileName: format => `${name}.${format}.js`
    },
    rollupOptions: {
      external: [...depexternals, ...peerexternals],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
        }
      }
    }
  }
})
