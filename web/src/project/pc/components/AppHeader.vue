<template>
  <header id="app-header" class="h-14 fixed inset-x-0 top-0 px-12  z-10 bg-white dark:bg-gray-950 drop-shadow-light dark:drop-shadow-dark" :class="{'header-hide': y > 200}">
    <div class="flex items-center mx-auto" style="max-width: 1300px;">
      <a class="flex items-center" href="/">
        <img class="w-10 h-11" src="../assets/logo.png" alt="">
        <h3 class="ml-4">我们的俄钓4</h3>
      </a>
      <!-- 前进后退按钮 -->
      <n-space class="ml-20 w-20" align="center" justify="space-between">
        <n-button text>
          <n-icon :component="IosArrowBack" size="20" />
        </n-button>
        <n-button text>
          <n-icon :component="IosArrowForward" size="20" />
        </n-button>    
      </n-space>

      <n-space class="right-icons flex-1" justify="end" align="center">

        <!-- github地址 -->
        <div>
          <a target="_blank" href="https://github.com/fangchenjia">
            <svg viewBox="0 0 24 24" width="1.5em" height="1.5em"><mask id="uicons-cx5pae91i8" width="24" height="24" x="0" y="0"><g fill="#fff"><ellipse cx="9.5" cy="9" rx="1.5" ry="1"></ellipse><ellipse cx="14.5" cy="9" rx="1.5" ry="1"></ellipse></g></mask><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="30" stroke-dashoffset="30" d="M12 4C13.6683 4 14.6122 4.39991 15 4.5C15.5255 4.07463 16.9375 3 18.5 3C18.8438 4 18.7863 5.21921 18.5 6C19.25 7 19.5 8 19.5 9.5C19.5 11.6875 19.017 13.0822 18 14C16.983 14.9178 15.8887 15.3749 14.5 15.5C15.1506 16.038 15 17.3743 15 18C15 18.7256 15 21 15 21M12 4C10.3317 4 9.38784 4.39991 9 4.5C8.47455 4.07463 7.0625 3 5.5 3C5.15625 4 5.21371 5.21921 5.5 6C4.75 7 4.5 8 4.5 9.5C4.5 11.6875 4.98301 13.0822 6 14C7.01699 14.9178 8.1113 15.3749 9.5 15.5C8.84944 16.038 9 17.3743 9 18C9 18.7256 9 21 9 21"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="30;0"></animate></path><path stroke-dasharray="10" stroke-dashoffset="10" d="M9 19"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.2s" values="10;0"></animate><animate attributeName="d" dur="3s" repeatCount="indefinite" values="M9 19c-1.406 0-2.844-.563-3.688-1.188C4.47 17.188 4.22 16.157 3 15.5;M9 19c-1.406 0-3-.5-4-.5-.532 0-1 0-2-.5;M9 19c-1.406 0-2.844-.563-3.688-1.188C4.47 17.188 4.22 16.157 3 15.5"></animate></path></g><rect width="8" height="4" x="8" y="11" fill="currentColor" mask="url(#uicons-cx5pae91i8)"><animate attributeName="y" dur="10s" keyTimes="0;0.45;0.46;0.54;0.55;1" repeatCount="indefinite" values="11;11;7;7;11;11"></animate></rect></svg>
          </a>
        </div>

        <!-- 主题切换开关 -->
        <n-tooltip
          placement="bottom"
          trigger="hover"
        >
          <template #trigger>
            <i @click="appStore.toggleTheme()" >
              <svg v-show="appStore.theme === 'dark'" viewBox="0 0 24 24" width="1.5em" height="1.5em"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><g stroke-dasharray="2"><path d="M12 21v1M21 12h1M12 3v-1M3 12h-1"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="4;2"></animate></path><path d="M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="4;2"></animate></path></g><path fill="currentColor" d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z" opacity="0"><set attributeName="opacity" begin="0.5s" to="1"></set></path></g><g fill="none" stroke="currentColor" stroke-dasharray="4" stroke-dashoffset="4" stroke-linecap="round" stroke-linejoin="round"><path d="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5"><animate id="lineMdSunnyFilledLoopToMoonAltFilledLoopTransition0" fill="freeze" attributeName="stroke-dashoffset" begin="0.6s;lineMdSunnyFilledLoopToMoonAltFilledLoopTransition0.begin+6s" dur="0.4s" values="4;0"></animate><animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdSunnyFilledLoopToMoonAltFilledLoopTransition0.begin+2s;lineMdSunnyFilledLoopToMoonAltFilledLoopTransition0.begin+4s" dur="0.4s" values="4;0"></animate><animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdSunnyFilledLoopToMoonAltFilledLoopTransition0.begin+1.2s;lineMdSunnyFilledLoopToMoonAltFilledLoopTransition0.begin+3.2s;lineMdSunnyFilledLoopToMoonAltFilledLoopTransition0.begin+5.2s" dur="0.4s" values="0;4"></animate><set attributeName="d" begin="lineMdSunnyFilledLoopToMoonAltFilledLoopTransition0.begin+1.8s" to="M12 5h1.5M12 5h-1.5M12 5v1.5M12 5v-1.5"></set><set attributeName="d" begin="lineMdSunnyFilledLoopToMoonAltFilledLoopTransition0.begin+3.8s" to="M12 4h1.5M12 4h-1.5M12 4v1.5M12 4v-1.5"></set><set attributeName="d" begin="lineMdSunnyFilledLoopToMoonAltFilledLoopTransition0.begin+5.8s" to="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5"></set></path><path d="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5"><animate id="lineMdSunnyFilledLoopToMoonAltFilledLoopTransition1" fill="freeze" attributeName="stroke-dashoffset" begin="1s;lineMdSunnyFilledLoopToMoonAltFilledLoopTransition1.begin+6s" dur="0.4s" values="4;0"></animate><animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdSunnyFilledLoopToMoonAltFilledLoopTransition1.begin+2s;lineMdSunnyFilledLoopToMoonAltFilledLoopTransition1.begin+4s" dur="0.4s" values="4;0"></animate><animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdSunnyFilledLoopToMoonAltFilledLoopTransition1.begin+1.2s;lineMdSunnyFilledLoopToMoonAltFilledLoopTransition1.begin+3.2s;lineMdSunnyFilledLoopToMoonAltFilledLoopTransition1.begin+5.2s" dur="0.4s" values="0;4"></animate><set attributeName="d" begin="lineMdSunnyFilledLoopToMoonAltFilledLoopTransition1.begin+1.8s" to="M17 11h1.5M17 11h-1.5M17 11v1.5M17 11v-1.5"></set><set attributeName="d" begin="lineMdSunnyFilledLoopToMoonAltFilledLoopTransition1.begin+3.8s" to="M18 12h1.5M18 12h-1.5M18 12v1.5M18 12v-1.5"></set><set attributeName="d" begin="lineMdSunnyFilledLoopToMoonAltFilledLoopTransition1.begin+5.8s" to="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5"></set></path><path d="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5"><animate id="lineMdSunnyFilledLoopToMoonAltFilledLoopTransition2" fill="freeze" attributeName="stroke-dashoffset" begin="2.8s;lineMdSunnyFilledLoopToMoonAltFilledLoopTransition2.begin+6s" dur="0.4s" values="4;0"></animate><animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdSunnyFilledLoopToMoonAltFilledLoopTransition2.begin+2s" dur="0.4s" values="4;0"></animate><animate fill="freeze" attributeName="stroke-dashoffset" begin="lineMdSunnyFilledLoopToMoonAltFilledLoopTransition2.begin+1.2s;lineMdSunnyFilledLoopToMoonAltFilledLoopTransition2.begin+3.2s" dur="0.4s" values="0;4"></animate><set attributeName="d" begin="lineMdSunnyFilledLoopToMoonAltFilledLoopTransition2.begin+1.8s" to="M20 5h1.5M20 5h-1.5M20 5v1.5M20 5v-1.5"></set><set attributeName="d" begin="lineMdSunnyFilledLoopToMoonAltFilledLoopTransition2.begin+5.8s" to="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5"></set></path></g><mask id="uicons-j4bqebqdbo"><circle cx="12" cy="12" r="12" fill="#fff"></circle><circle cx="22" cy="2" r="3" fill="#fff"><animate fill="freeze" attributeName="cx" begin="0.1s" dur="0.4s" values="22;18"></animate><animate fill="freeze" attributeName="cy" begin="0.1s" dur="0.4s" values="2;6"></animate><animate fill="freeze" attributeName="r" begin="0.1s" dur="0.4s" values="3;12"></animate></circle><circle cx="22" cy="2" r="1"><animate fill="freeze" attributeName="cx" begin="0.1s" dur="0.4s" values="22;18"></animate><animate fill="freeze" attributeName="cy" begin="0.1s" dur="0.4s" values="2;6"></animate><animate fill="freeze" attributeName="r" begin="0.1s" dur="0.4s" values="1;10"></animate></circle></mask><circle cx="12" cy="12" r="6" fill="currentColor" mask="url(#uicons-j4bqebqdbo)"><set attributeName="opacity" begin="0.5s" to="0"></set><animate fill="freeze" attributeName="r" begin="0.1s" dur="0.4s" values="6;10"></animate></circle></svg>
              <svg v-show="appStore.theme === 'light'" viewBox="0 0 24 24" width="1.5em" height="1.5em"><g fill="none" stroke="currentColor" stroke-dasharray="2" stroke-dashoffset="2" stroke-linecap="round" stroke-width="2"><path d="M0 0"><animate fill="freeze" attributeName="d" begin="0.6s" dur="0.2s" values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"></animate><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="2;0"></animate></path><path d="M0 0"><animate fill="freeze" attributeName="d" begin="0.9s" dur="0.2s" values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"></animate><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.9s" dur="1.2s" values="2;0"></animate></path><animateTransform attributeName="transform" dur="30s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"></animateTransform></g><mask id="uicons-8i9dgwe5k6"><circle cx="12" cy="12" r="12" fill="#fff"></circle><circle cx="12" cy="12" r="8"><animate fill="freeze" attributeName="r" dur="0.4s" values="8;4"></animate></circle><circle cx="18" cy="6" r="12" fill="#fff"><animate fill="freeze" attributeName="cx" dur="0.4s" values="18;22"></animate><animate fill="freeze" attributeName="cy" dur="0.4s" values="6;2"></animate><animate fill="freeze" attributeName="r" dur="0.4s" values="12;3"></animate></circle><circle cx="18" cy="6" r="10"><animate fill="freeze" attributeName="cx" dur="0.4s" values="18;22"></animate><animate fill="freeze" attributeName="cy" dur="0.4s" values="6;2"></animate><animate fill="freeze" attributeName="r" dur="0.4s" values="10;1"></animate></circle></mask><circle cx="12" cy="12" r="10" fill="currentColor" mask="url(#uicons-8i9dgwe5k6)"><animate fill="freeze" attributeName="r" dur="0.4s" values="10;6"></animate></circle></svg>
            </i>
          </template>
          主题切换
        </n-tooltip>

        <!-- 消息提醒 -->
        <n-dropdown v-if="userStore.isLogin" :options="messageOptions" trigger="hover" @select="messageSelectHandle">
          <n-icon size="21" :component="Bell">
          </n-icon>
        </n-dropdown>

        <!-- 管理员入口 -->
        <n-tooltip
          placement="bottom"
          trigger="hover"
        >
          <template #trigger>
            <div>
              <a target="_blank" href="/admin">
                <n-icon :size="20" :component="UsersCog"></n-icon>
              </a>
            </div>
          </template> 
          管理员入口
        </n-tooltip>

        <div class="flex items-center">
          <!-- 头像框 -->
          <n-dropdown v-if="userStore.isLogin" :options="userOptions" trigger="hover" @select="userSelectHandle">
            <n-avatar round size="small" :src="userStore.userInfo?.avatar || generateRandomPixelAvatar(20)" class="mr-2"/>
          </n-dropdown>
          <!-- 登录按钮 -->
          <n-button v-else text type="primary" @click="LoginModal.open()">
            登录
          </n-button>
        </div>

      </n-space>
    </div>
  </header>
  <!-- 空白填充 -->
  <div class="h-14"></div>
</template>

<script setup lang="ts">
import { useAppStore } from '@pc/stores/app'
import { LogInOutlined, ModeCommentOutlined } from '@vicons/material'
import { User, Bell, MessageCircle, ThumbUp } from '@vicons/tabler'
import { IosArrowBack, IosArrowForward } from '@vicons/ionicons4'
import { UsersCog } from '@vicons/fa'
import { renderIcon } from '@pc/utils/render'
import { useUserStore } from '@/store/user'
import LoginModal from './LoginModal'
import { useRouter } from 'vue-router'
import { useWindowScroll } from '@vueuse/core'
import { generateRandomPixelAvatar } from '@/utils';

const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()
const { y } = useWindowScroll()

// 用户菜单配置
const userOptions = [
  {
    label: '个人中心',
    key: 'userInfo',
    icon: renderIcon(User),
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogInOutlined),
  }
]
// 消息菜单配置
const messageOptions = [
  {
    label: '私信',
    key: 'message',
    icon: renderIcon(MessageCircle),
  },
  {
    label: '评论',
    key: 'comment',
    icon: renderIcon(ModeCommentOutlined),
  },
  {
    label: '点赞',
    key: 'like',
    icon: renderIcon(ThumbUp),
  }
]

// 用户菜单选择
const userSelectHandle = (key: string) => {
  switch (key) {
    case 'userInfo':
      router.push('/user-info')
      break
    case 'logout':
      userStore.clearUser()
      break
    default:
      break
  }
}
// 消息菜单选择
const messageSelectHandle = (key: string) => {
  switch (key) {
    case 'message':
      router.push('/message')
      break
    case 'comment':
      router.push('/comment')
      break
    case 'like':
      router.push('/like')
      break
    default:
      break
  }
}
</script>

<style scoped lang="scss">
.right-icons {
  // 样式穿透
  :deep(svg) {
    position: relative;
    bottom: -0.145em;
  }
}

#app-header {
  transition: all 0.3s;
}

.header-hide {
  top: -3.5rem !important;
}

</style>