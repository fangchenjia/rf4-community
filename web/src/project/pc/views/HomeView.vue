<script setup lang="ts">
import { Map } from "@vicons/fa";
import { PhotoFilterTwotone, AccessTimeRound } from "@vicons/material";
import { Locate, LogoWechat } from "@vicons/ionicons5";
import { RouterLink, useRouter } from "vue-router";
import { MenuOption } from "naive-ui";
import { renderIcon } from "@/project/pc/utils/render";
import { useThemeVars } from "naive-ui";
import { useLoadingBar } from "naive-ui";
import globelRouter from "@pc/router";
import SiteRecommend from "@pc/views/modules/SiteRecommend.vue";
import UserPointRank from "@pc/views/modules/UserPointRank.vue";
import MainLayout from "../components/MainLayout.vue";
import { useMapStore } from "@/store/map";
import { useMediaQuery } from '@vueuse/core';

const isLargeScreen = useMediaQuery('(min-width: 1024px)')
// 首页初始化地图
useMapStore().getMaps();
// 跳转路由添加progress
const loadingBar = useLoadingBar();
globelRouter.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    loadingBar.start();
  }
  next();
});
globelRouter.afterEach(() => {
  loadingBar.finish();
});

const router = useRouter();
const themeVars = useThemeVars();

// 左侧菜单栏
const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/recommend",
          },
        },
        { default: () => "最新" }
      ),
    key: "home",
    icon: renderIcon(PhotoFilterTwotone),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: "/wechatPoint",
          },
        },
        { default: () => "微信公众号" }
      ),
    key: "wechatPoint",
    icon: renderIcon(LogoWechat),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "mapPoint",
          },
        },
        { default: () => "地图点位查询" }
      ),
    key: "map-point",
    icon: renderIcon(Map),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "pointDistribution",
          },
        },
        { default: () => "点位分布" }
      ),
    key: "point-distribution",
    icon: renderIcon(Locate),
  },
];

import { useNow } from "@vueuse/core";
const now = useNow();

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
  const timeFormat = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;

  // 返回游戏内时间格式
  return timeFormat;
}
</script>

<template>
  <MainLayout>
    <!-- 左部 nav -->
    <template #left-nav>
      <n-card :content-style="{ padding: 0 }" :bordered="false" class="rounded w-44" v-if="isLargeScreen">
        <n-menu :options="menuOptions" />
      </n-card>
    </template>
    <!-- 主体部分 -->
    <template #main>
      <n-card :content-style="{ padding: 0 }" :bordered="false" class="mb-5" v-if="!isLargeScreen">
        <n-menu :options="menuOptions" mode="horizontal"/>
      </n-card>
      <n-card :bordered="false" class="rounded">
        <router-view />
      </n-card>
    </template>
    <!-- 右部 aside -->
    <template #right-aside>
      <n-card :bordered="false" class="rounded w-64" content-style="display: flex; align-items: center; justify-content: space-around; padding: 1rem;">
        <div>
          <span class="">当前游戏时间</span>
          <p class="flex items-center mb-0 mt-1">
            <n-icon size="20" :component="AccessTimeRound" :color="themeVars.primaryColor"></n-icon>
            <n-gradient-text type="primary" class="ml-2 text-base">
              {{ convertToGameTime(now) }}
            </n-gradient-text>
          </p>
        </div>
        <n-button type="primary" ghost @click="router.push('/contribute')">去投稿</n-button>
      </n-card>
      <UserPointRank />
      <SiteRecommend />
    </template>
  </MainLayout>
</template>

<style scoped lang="scss">
.top-18 {
  top: 4.75rem;
}
</style>
