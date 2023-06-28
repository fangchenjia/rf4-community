import 'normalize.css'
import './assets/main.css'

import { createApp } from 'vue'
import { setupStore } from '@/store'

import { createDiscreteApi } from 'naive-ui'

import router from './router'

import App from './App.vue'

const app = createApp(App)
// 注册全局 store
setupStore(app)
app.use(router)

const { message, notification, dialog, loadingBar } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar']
)
window.$message = message

app.mount('#app')
