<script setup lang="ts">
import { userRegister } from '@pc/services/user'
import loginModal from '@pc/components/LoginModal'
import { useAppStore } from '../stores/app';

loginModal.open()
const appStore = useAppStore()
</script>

<template>
  <div>
    <p class="mt-6">pc端开发中</p>
    <n-space>
    <n-button>Default</n-button>
    <n-button type="tertiary">
      Tertiary
    </n-button>
    <n-button type="primary" @click="appStore.setTheme('dark')">
      Primary
    </n-button>
    <n-button type="info"  @click="appStore.theme='light'">
      Info
    </n-button>
    <n-button type="success">
      Success
    </n-button>
    <n-button type="warning">
      Warning
    </n-button>
    <n-button type="error">
      Error
    </n-button>
  </n-space>
  </div>
</template>
@/project/pc/components/LoginModal