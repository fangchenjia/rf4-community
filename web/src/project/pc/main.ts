import 'normalize.css'
import './assets/main.css'

import { createApp } from 'vue'
import { setupStore } from '@/store'

import { createDiscreteApi } from 'naive-ui'

import router from './router'

import App from './App.vue'

import requestSetup from '@/project/pc/request'

import { isMobile } from '@/utils/platform'
// 如果是移动端，跳转到移动端页面
if (isMobile()) {
  location.href = 'https://rf4.cosycosy.cn/mobile/'
}

const app = createApp(App)
// 注册全局 store
setupStore(app)
// 注册全局路由
app.use(router)
// 注册全局组件
const { message } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar'],
  {
    messageProviderProps: {
      max: 2,
    }
  }
)
window.$message = message
// 注册全局请求
requestSetup()

app.mount('#app')
