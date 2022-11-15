import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path";

//@ts-ignore
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    dedupe: [
      'vue'
    ],
  },
  plugins: [
    vue(),
    dts({
      outputDir: resolve(__dirname, 'types'),
    })
  ],
  build:{
    lib:{
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'index',
      // formats: ['es'],
      // the proper extensions will be added
      fileName: 'index'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
})
