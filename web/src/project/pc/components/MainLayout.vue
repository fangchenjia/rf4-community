<template>
  <section class="flex mt-5">
    <!-- 左部 nav -->
    <nav class="sticky top-5 transition-all duration-300 h-full" :class="{ 'top-18': y < 200 }">
      <slot name="left-nav"></slot>
    </nav>
    <!-- 主体部分 -->
    <main class="flex-1 mx-5">
      <slot name="main"></slot>
    </main>
    <!-- 右部 aside -->
    <aside class="pr-5">
      <slot name="right-aside"></slot>
    </aside>
  </section>
</template>

<script setup lang="ts" name="mainLayout">
import { useWindowScroll } from "@vueuse/core";
const { y } = useWindowScroll();
</script>

<style scoped lang="scss">
.top-18 {
  top: 4.75rem;
}
</style>
