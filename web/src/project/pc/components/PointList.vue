<template>
  <n-list>
    <template #header>
      <slot name="header"></slot>
    </template>
    <n-list-item v-for="point in $props.pointList" :key="point._id" @click="router.push(`/point-detail/${point._id}`)">
      <template #suffix>
        <img class="w-36 h-24 rounded-md" :src="point.fishImages[0] || point.fish[0].image" alt="" />
      </template>
      <n-thing>
        <template #header>
          <div class="flex items-center">
            <n-ellipsis class="font-normal" style="max-width: 160px">
              {{ point.title }}
            </n-ellipsis>
            <n-ellipsis class="ml-3 text-xs font-light" style="max-width: 160px">
              {{ point.description }}
            </n-ellipsis>
          </div>
        </template>
        <template #header-extra>
          <n-ellipsis class="font-normal text-sm"> 点位：{{ point.position }} </n-ellipsis>
        </template>
        <div class="flex items-center">
          <n-tag type="success" size="small" class="mr-2">{{ point.map.name }}</n-tag>
          <n-ellipsis class="text-sm text-gray-500" style="max-width: 280px">
            <span class="mr-2" type="info" v-for="item in point.fish" size="small" :key="item.name">
              {{ item.name }}
            </span>
          </n-ellipsis>
        </div>
        <template #footer>
          <div class="flex items-end justify-between">
            <ul class="action-list flex items-end text-slate-500 text-xs">
              <!-- 作者 -->
              <li>
                <n-avatar round :size="18" :src="point.author.avatar" class="mr-2" />
                <n-ellipsis style="max-width: 80px">
                  {{ point.author.nickname }}
                </n-ellipsis>
                <n-gradient-text class="ml-2" type="info">
                  {{ point.author.roles[0]?.name }}
                </n-gradient-text>
                <n-divider vertical />
              </li>
              <!-- 时间 -->
              <li>
                <n-ellipsis style="max-width: 80px">
                  {{ formatTimeAgo(point.createdAt) }}
                </n-ellipsis>
                <n-divider vertical />
              </li>
              <!-- 浏览量 -->
              <li>
                <n-icon class="mr-2" :size="14" :component="EyeOutline"></n-icon>
                <span>{{ point.views }}</span>
                <n-divider vertical />
              </li>
              <!-- 点赞数 -->
              <li>
                <n-icon
                  class="mr-2"
                  :size="14"
                  :color="point.likes.includes(userStore.userInfo._id) ? themeVars.primaryColor : ''"
                  :component="ThumbUpAltOutlined"
                  @click.stop="likePointHandle(point._id)"
                ></n-icon>
                <span>{{ point.likes.length }}</span>
              </li>
            </ul>
            <div>
              <n-tag class="mr-2" type="info" v-for="tag in point.tags.slice(0, 2)" size="small" :key="tag">
                {{ tag }}
              </n-tag>
            </div>
          </div>
        </template>
      </n-thing>
    </n-list-item>
    <n-empty class="mt-5" description="暂无数据，确定不去做第一个投稿的人吗" v-if="$props.pointList.length === 0">
      <template #extra>
        <n-button size="small" @click="router.push('/contribute')"> 去投稿 </n-button>
      </template>
    </n-empty>
  </n-list>
</template>

<script setup lang="ts" name="latestPoint">
import { EyeOutline } from "@vicons/ionicons5";
import { ThumbUpAltOutlined } from "@vicons/material";
import { likePoint } from "@/api/point";
import { formatTimeAgo } from "@/utils";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import { useThemeVars } from "naive-ui";

const userStore = useUserStore();
const router = useRouter();
const themeVars = useThemeVars();

const $props = defineProps({
  pointList: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
});

// 点赞
const likePointHandle = (pointId: string) => {
  likePoint(pointId).then(({ data }) => {
    $props.pointList.find((item: any) => item._id === pointId).likes = data;
  });
};
</script>

<style scoped lang="scss">
.action-list {
  li {
    display: flex;
    align-items: center;
  }
}
</style>
