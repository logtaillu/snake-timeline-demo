import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import dts from 'vite-plugin-dts';
const name = require("./package.json").name;
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
      external: ['react', 'react-dom', 'styled-components',"ahooks"],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
        },
      },
    }
  }
})
