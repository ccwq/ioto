/// <reference types="vitest" />
import { defineConfig } from 'vite'
import {resolve} from "path";

//@ts-ignore
import dts from 'vite-plugin-dts'


const isDev = process.env.NODE_ENV === 'development'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      outputDir: resolve(__dirname, 'types'),
    })
  ],
  build:{
    lib:{
      entry: resolve(__dirname, 'src/index.ts'),

      // Option "build.lib.name" is required when output formats include "umd" or "iife".
      name: 'index',
      // formats: ['es'],
      // the proper extensions will be added
      fileName: 'index'
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {
          // vue: 'Vue'
        }
      }
    }
  },

  define: {

    // 一处vitest的测试代码
    ...isDev?{}:{
      'import.meta.vitest': 'undefined'
    }
  },

  test:{

    // 文件内测试
    includeSource: ['src/**/*.{js,ts}'],

    // 解决类似windows is not define问题
    environment:"jsdom",
  },
})
