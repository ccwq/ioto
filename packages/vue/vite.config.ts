import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from "path";

//@ts-ignore
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts()],
  build:{
    lib:{
      entry: resolve(__dirname, 'src/index.ts'),
      // name: 'foo',
      formats: ['es'],
      // the proper extensions will be added
      // fileName: 'index'
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
