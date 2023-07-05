<script setup lang="ts">
import { NConfigProvider, darkTheme } from 'naive-ui'
import { useAppStore } from '@pc/stores/app'

const appStore = useAppStore()
</script>

<template>
  <n-theme-editor>
    <n-config-provider :theme="appStore.theme === 'dark' ? darkTheme : undefined" :theme-overrides="appStore.themeOverrides">
      <n-global-style />
      <n-message-provider>
        <n-dialog-provider>
          <RouterView />
        </n-dialog-provider>
      </n-message-provider>
    </n-config-provider>
  </n-theme-editor>
</template>

<style scoped>
</style>
