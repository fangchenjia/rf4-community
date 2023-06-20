import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'


//  npm run dev:pc 拿到pc
const APP_NAME = process.env.npm_lifecycle_event?.split(':')[1] as string
// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const appName = APP_NAME
  return {
    root: `src/packages/${appName}/`,
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@pc': fileURLToPath(new URL('./src/packages/pc', import.meta.url)),
        '@admin': fileURLToPath(new URL('./src/packages/admin', import.meta.url)),
        '@mobile': fileURLToPath(new URL('./src/packages/mobile', import.meta.url)),
      }
    },
    build: {
      // 不配置的话打包后的文件路径为packages/xxx/dist，配置后为dist/xxx
      outDir: `../../../dist/${appName}`,
      rollupOptions: {
        input: {
          [appName]: resolve(__dirname, `src/packages/${appName}/index.html`)
        },
        output: {
            chunkFileNames: 'js/[name]-[hash].js',
            entryFileNames: 'js/[name]-[hash].js',
            assetFileNames: '[ext]/[name]-[hash].[ext]',
        }
      }
    }
  }
})
