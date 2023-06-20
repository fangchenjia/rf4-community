import { fileURLToPath, URL } from 'url'
import fs from "fs";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import chalk from 'chalk'

// 日志提示
const errorLog = (msg:string) => console.log(chalk.red(`${msg}`))
// 获取npm run dev --page=xxx中的xxx
const npm_config_page:string =  process.env.npm_config_page || ''
// 获取所有的入口文件路径
const getEntryPath = () => {
  const map: Record<string,string> = {} //最后生成的多页面配置项
  const PAGE_PATH = resolve(__dirname, './src/project')  //指定要查询的目录
  const entryFiles = fs.readdirSync(PAGE_PATH)   //获取到指定目录下的所有文件名
  entryFiles.forEach(filePath => {   //遍历处理每个子页面的入口
      map[filePath] = resolve(__dirname,
      `src/Project/${filePath}/index.html`
      )
  })
  return map
}
const project = getEntryPath();

const getInput = () => {
  if (!npm_config_page){
    errorLog('-----------------------请输入 --page=xxx 参数指定页面名称！-------------------------')
    return {}
  }
  const enterPagePath = project[npm_config_page]
  if (!enterPagePath){
    errorLog('-----------------------不存在此项目，请检查页面名称！-------------------------')
    return {}
  }
  return {
    [npm_config_page]: resolve(__dirname,`src/project/${npm_config_page}/index.html`)
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  root: `src/project/${npm_config_page}/`,
  envDir: resolve(__dirname), //用于加载 .env 文件的目录。可以是一个绝对路径，也可以是相对于项目根的路径。
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@project': fileURLToPath(new URL('./src/project', import.meta.url)),
    }
  },
  build: {
    // 不配置的话打包后的文件路径为packages/xxx/dist，配置后为dist/xxx
    outDir: resolve(__dirname, `dist/${npm_config_page}`),
    rollupOptions: {
      input: getInput(),
      output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
      }
    }
  },
})
