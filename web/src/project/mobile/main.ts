import { createApp } from 'vue'
import requestSetup from '@/project/mobile/request'
import { setupStore } from '@/store'

import router from './router'

import App from './App.vue'

import 'normalize.css'
import './assets/main.css'
// 包括 Toast，Dialog，Notify 和 ImagePreview 组件。在使用函数组件时，unplugin-vue-components 无法解析自动注册组件，导致 @vant/auto-import-resolver 无法解析样式，因此需要手动引入样式
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';
import 'amfe-flexible';

const app = createApp(App)

setupStore(app)
app.use(router)

app.mount('#app')

requestSetup()

