/// <reference types="vitest" />
import {defineConfig} from 'vite'
import {resolve} from "path";

//@ts-ignore
import dts from 'vite-plugin-dts'


const isDev = process.env.NODE_ENV === 'development'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        dts({
            outputDir: resolve(__dirname, 'types'),
            entryRoot: resolve(__dirname, 'src'),
        })
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),

            // Option "build.src.name" is required when output formats include "umd" or "iife".
            name: 'index',
            // formats: ['es'],
            // the proper extensions will be added
            fileName: 'index'
        },

        // 确保外部化处理那些你不想打包进库的依赖
        rollupOptions: {
            external: [],
            output: {

                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    // vue: 'Vue'
                }
            }
        }
    },

    define: {

        // 一处vitest的测试代码
        ...isDev ? {} : {
            'import.meta.vitest': 'undefined'
        }
    },

    test: {

        // 文件内测试
        // includeSource: ['src/**/*.{js,ts}'],

        // 解决类似windows is not define问题
        environment: "jsdom",
    },
})
