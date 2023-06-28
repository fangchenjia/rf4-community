import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia()
store.use(piniaPluginPersistedstate) // 持久化保存插件

export function setupStore(app: App<Element>) {
  app.use(store)
}

export { store }