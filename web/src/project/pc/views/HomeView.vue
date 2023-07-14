<script setup lang="ts">
import { userInfo, userLogin } from '@/api'
import { useAppStore } from '../stores/app';
import { useUserStore } from '@/store/user';
userInfo()
const appStore = useAppStore()
const test = () => {
  console.log('test')
  for(let i=0;i<6;i++){
    userInfo().then(res=>{
      console.log(res.code)
    }).catch(err=>{
      console.log(err.code)
    })
  }
}
</script>

<template>
  <div>
    <p class="mt-6">pc端开发中</p>
    <n-space>
    <n-button>Default</n-button>
    <n-button type="tertiary" @click="test">
      获取用户信息
    </n-button>
    <n-button type="primary" @click="appStore.setTheme('dark')">
      切换黑夜模式
    </n-button>
    <n-button type="info"  @click="appStore.theme='light'">
      切换白天模式
    </n-button>
    <n-button type="success" @click="useUserStore().clearUser()">
      清除缓存
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