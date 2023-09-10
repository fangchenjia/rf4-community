<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { Map } from '@vicons/fa'
import { PhotoFilterTwotone } from '@vicons/material'
import { RouterLink } from 'vue-router'
import { MenuOption } from 'naive-ui'
import { renderIcon } from '@/project/pc/utils/render'

// 滚动超过200 header会隐藏 所以左边nav需要上移 
const { y } = useWindowScroll()
// 左侧菜单栏
const menuOptions : MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/recommend'
          }
        },
        { default: () => '推荐' }
      ),
    key: 'home',
    icon: renderIcon(PhotoFilterTwotone)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'mapPoint'
          }
        },
        { default: () => '地图点位查询' }
      ),
    key: 'map-point',
    icon: renderIcon(Map)
  }
]

import { useNow } from '@vueuse/core'
const now = useNow()

/**
 * 将真实时间转换为游戏时间格式。
 *
 * @param {number} realTime - 真实时间戳
 * @return {string} 游戏时间，以HH:mm格式显示。
 */
 function convertToGameTime(realTime) {
  // 计算游戏内时间的毫秒数
  const gameTimeMs = realTime * 24;

  // 创建一个日期对象，设置为游戏内时间
  const gameDate = new Date(gameTimeMs);

  // 提取游戏内时间的小时和分钟
  const hours = gameDate.getUTCHours();
  const minutes = gameDate.getMinutes();

  // 格式化时间为字符串
  const timeFormat = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;

  // 返回游戏内时间格式
  return timeFormat;
}


</script>

<template>
  <section class="flex mt-5">
    <!-- 左部 nav -->
    <nav class="sticky top-5 w-44 h-12 transition-all duration-300" :class="{ 'top-18': y < 200 }">
      <n-card :content-style="{padding: 0}" :bordered="false" class="rounded">
        <n-menu :options="menuOptions" />
      </n-card>
    </nav>
    <!-- 主体部分 -->
    <main class="flex-1 mx-5">
      <n-card :bordered="false" class="rounded">
        <router-view />
      </n-card>
    </main>
    <!-- 右部 aside -->
    <aside class="w-64">
      <n-card :bordered="false" class="rounded">
        游戏时间：{{ convertToGameTime(now.getTime()) }}
      </n-card>
    </aside>
  </section>
</template>

<style scoped lang="scss">
.top-18 {
  top: 4.75rem;
}
</style>
