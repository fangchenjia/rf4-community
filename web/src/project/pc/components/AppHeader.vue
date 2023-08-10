<template>
  <div class="px-8 flex items-center">
    <div class="flex items-center">
      <img class="w-10 h-11" src="../assets/logo.png" alt="">
      <h3 class="ml-4">我们的俄钓4</h3>
    </div>
    <!-- 前进后退按钮 -->
    <!-- <n-space class="ml-20 w-20" align="center" justify="space-between">
      <n-button text>
        <n-icon :component="IosArrowBack" size="20" />
      </n-button>
      <n-button text>
        <n-icon :component="IosArrowForward" size="20" />
      </n-button>    
    </n-space> -->
    <n-space class="flex-1" justify="end" align="center">
      <div class="flex items-center">
        <!-- 头像框 -->
        <n-avatar round src="https://avatars.githubusercontent.com/u/22588905?v=4" class="mr-2"/>
        <n-dropdown :options="userOptions" :show="userMenuShow" size="small">
          <div class="flex flex-col" @click="userClickHandle">
            <div class="flex items-center" >
              <!-- 用户名 -->
              <n-ellipsis style="max-width: 100px" :tooltip="false">
                {{ userStore.isLogin ? userStore.userInfo?.nickname : '神秘游客' }}
              </n-ellipsis>
              <n-icon :component="IosArrowDown" size="14" />
            </div>
            <!-- 用户类型 -->
            <span class="text-xs">{{ userStore.isLogin ? userStore.userInfo?.role : '未登录' }}</span>
          </div>     
        </n-dropdown>
      </div>

      <!-- 主题切换开关 -->
      <n-switch v-model:value="themeSwitch" :on-update-value="themeUpdate" size="medium">
        <template #checked-icon>
          <n-icon :component="IosMoon" />
        </template>
        <template #unchecked-icon>
          <n-icon :component="IosSunny" />
        </template>
        <!-- <template #checked>
          黑夜模式
        </template>
        <template #unchecked>
          白天模式
        </template> -->
      </n-switch>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@pc/stores/app'
import { IosMoon, IosSunny, IosArrowBack, IosArrowForward, IosArrowDown } from '@vicons/ionicons4'
import { User } from '@vicons/fa'
import { renderIcon } from '@pc/utils/render'
import { useUserStore } from '@/store/user'
import LoginModal from './LoginModal'

const userStore = useUserStore()
const appStore = useAppStore()
// 主题切换
let themeSwitch = appStore.theme === 'dark'
let themeUpdate = (value : boolean) => {
  appStore.setTheme(value ? 'dark' : 'light')
}
// 用户菜单配置
const userOptions = [
  {
    label: '个人中心',
    key: 'user-center',
    icon: renderIcon(User),
  }
]
// 用户菜单是否显示
const userMenuShow = ref(false)
// 用户名点击事件
const userClickHandle = () => {
  // 如果未登录，先登录
  if (!userStore.isLogin) {
    LoginModal.open()
    return
  }
  userMenuShow.value = !userMenuShow.value
}
</script>