import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve, join} from "path";
import vueJsx from '@vitejs/plugin-vue-jsx'

//@ts-ignore
import dts from 'vite-plugin-dts'
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        dedupe: [
            'vue'
        ],
    },
    plugins: [
        vueJsx(),
        vue(),
        dts({
            entryRoot: resolve(__dirname, 'src'),
            outputDir: resolve(__dirname, 'types'),
        })
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'index',
            // formats: ['es'],
            // the proper extensions will be added
            fileName: 'index'
        },
        rollupOptions: {
            external: [
                'vue',
                'lodash',
                "@ioto/core",
                // "@ioto/vue",
                'element-plus',
                "@form-create/element-ui",
                "@sipec/vue3-tags-input"
            ],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        }
    },
})
