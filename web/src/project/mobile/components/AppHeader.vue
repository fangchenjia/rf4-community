<template>
  <header id="app-header" class="fixed inset-x-0 top-0 px-1 z-10 bg-white drop-shadow-light">
    <div class="h-5 flex items-center justify-between mx-auto">
      <a class="flex items-center" href="/">
        <img class="w-4 h-4" src="../assets/logo.png" alt="" />
        <h3 class="ml-1 text-slate-800 text-base">我们的俄钓4</h3>
      </a>
      <div v-if="userStore.isLogin" class="flex items-center">
        <img class="w-3 h-3 rounded" :src="userStore.userInfo?.avatar" />
        <p class="w-6 text-sm ml-1">
          <van-text-ellipsis :content="userStore.userInfo?.nickname" />
        </p>
      </div>
      <div
        v-else
        class="text-tiny text-blue-500"
        @click="
          () => {
            router.push('/login');
          }
        "
      >
        去登录
      </div>
    </div>
  </header>
  <!-- 空白填充 -->
  <div class="h-5"></div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
const router = useRouter();
const userStore = useUserStore();
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
