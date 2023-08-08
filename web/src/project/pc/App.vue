<script setup lang="ts">
import { NConfigProvider, darkTheme } from 'naive-ui'
import { useAppStore } from '@pc/stores/app'
import { useUserStore } from '@/store/user'
import { renderIcon } from '@pc/utils/render'
import { GripHorizontal } from '@vicons/fa'
import { LocationSharp, StorefrontSharp } from '@vicons/ionicons5'
import { PostAddRound, LogInOutlined } from '@vicons/material'
import AppHeader from '@pc/components/AppHeader.vue'
import { renderRouterLink } from '@pc/utils/render'

// 菜单配置
const menuOptions = [
  {
    label: renderRouterLink('首页', '/'),
    key: 'home',
    icon: renderIcon(GripHorizontal),
    path: '/'
  },
  {
    label: '攻略',
    key: 'introduction',
    type: 'group',
    children: [
      {
        label: renderRouterLink('点位', '/developing'),
        key: 'point',
        icon: renderIcon(LocationSharp)
      },
      {
        label: renderRouterLink('装备', '/developing'),
        key: 'equipment',
        icon: renderIcon(StorefrontSharp)
      },
      {
        label: renderRouterLink('帖子', '/developing'),
        key: 'post',
        icon: renderIcon(PostAddRound)
      }
    ]
  }
]

const appStore = useAppStore()
const userStore = useUserStore()
</script>

<template>
  <n-theme-editor>
    <n-config-provider :theme="appStore.theme === 'dark' ? darkTheme : undefined" :theme-overrides="appStore.themeOverrides">
      <n-global-style />
      <n-message-provider :max="2">
        <n-dialog-provider>
          <n-layout class="h-screen">
            <!-- 头部 -->
            <n-layout-header class="app-header">
              <AppHeader />
            </n-layout-header>
            <!-- 主体 -->
            <n-layout has-sider class="app-main">
              <!-- 侧边栏 -->
              <n-layout-sider
                :width="240"
                :content-style="{
                  height: '100%',
                }"
                :native-scrollbar="false"
              >
                <n-menu
                  :options="menuOptions"
                />
                <n-button round class="app-loginout" v-if="userStore.isLogin" @click="userStore.clearUser">
                  <template #icon>
                    <n-icon>
                      <LogInOutlined />
                    </n-icon>
                  </template>
                  退出登录
                </n-button>
              </n-layout-sider>
              <!-- 内容 -->
              <n-layout>
                <router-view />
              </n-layout>
            </n-layout>
          </n-layout>
        </n-dialog-provider>
      </n-message-provider>
    </n-config-provider>
  </n-theme-editor>
</template>

<style scoped>
.app-header {
  height: 64px;
}
.app-main {
  height: calc(100% - 64px);
}
.app-loginout {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
