<script setup lang="ts">
import { NConfigProvider, darkTheme } from 'naive-ui'
import { useAppStore } from '@pc/stores/app'
import AppHeader from '@pc/components/AppHeader.vue'

const appStore = useAppStore()
onMounted(() => {
  if (appStore.theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})

</script>

<template>
  <n-theme-editor>
    <n-config-provider :theme="appStore.theme === 'dark' ? darkTheme : undefined" :theme-overrides="appStore.themeOverrides">
      <n-global-style />
      <n-message-provider :max="2">
        <n-dialog-provider>
          <AppHeader />
          <section id="app-main">
            <n-loading-bar-provider>
              <router-view />
            </n-loading-bar-provider>
          </section>
        </n-dialog-provider>
      </n-message-provider>
    </n-config-provider>
  </n-theme-editor>
</template>

<style scoped lang="scss">
#app-main {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
