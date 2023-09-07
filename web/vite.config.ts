import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath, URL } from 'url'
import fs from "fs";
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import chalk from 'chalk'

// 报错提示
const errorLog = (msg:string) => console.log(chalk.red(`${msg}`))
// 温馨提示
const tipLog = (msg:string) => console.log(chalk.blue(`${msg}`))
// 获取npm run dev --page=xxx中的xxx
const npm_config_page:string =  process.env.npm_config_page || ''
// 获取所有的入口文件路径
const getEntryPath = () => {
  const map: Record<string,string> = {} //最后生成的多页面配置项
  const PAGE_PATH = resolve(__dirname, './src/project')  //指定要查询的目录
  const entryFiles = fs.readdirSync(PAGE_PATH)   //获取到指定目录下的所有文件名
  entryFiles.forEach(filePath => {   //遍历处理每个子页面的入口
    const stats = fs.statSync(resolve(__dirname,  `src/project/${filePath}`));
    if (stats.isDirectory()) {
      map[filePath] = resolve(__dirname,
      `src/project/${filePath}/index.html`
      )
    }
  })
  return map
}
const project = getEntryPath();

const getInput = () => {
  if (!npm_config_page){
    errorLog('-----------------------请输入 --page=xxx 参数指定项目名称')
    tipLog(`-----------------------可选项目有: ${Object.keys(project).join('/')}`)
    return {}
  }
  const enterPagePath = project[npm_config_page]
  if (!enterPagePath){
    errorLog('-----------------------不存在此项目，请检查项目名称！')
    tipLog(`-----------------------可选项目有: ${Object.keys(project).join('/')}`)
    return {}
  }
  return {
    [npm_config_page]: resolve(__dirname,`src/project/${npm_config_page}/index.html`)
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${npm_config_page}/`,
  root: `src/project/${npm_config_page}/`,
  envDir: resolve(__dirname, 'src'), //用于加载 .env 文件的目录。可以是一个绝对路径，也可以是相对于项目根的路径。
  plugins: [
    vue(),
    AutoImport({ // 自动导入NaiveUI
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Components({ // 自动导入NaiveUI
      resolvers: [NaiveUiResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@pc': fileURLToPath(new URL('./src/project/pc', import.meta.url)),
      '@public': fileURLToPath(new URL('./public', import.meta.url)),
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
  server: {
    port: 8090,
    proxy: {
      '/api-server': {
        target: 'http://110.42.213.115:3004',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-server/, '')
      }
    }
  }
})
