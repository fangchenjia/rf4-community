<template>
  <n-list>
    <template #header> 最近点位 </template>
    <n-list-item v-for="point in pointList" :key="point._id" @click="router.push(`/point-detail/${point._id}`)">
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
              <li>
                <n-ellipsis style="max-width: 80px">
                  {{ formatTimeAgo(point.createdAt) }}
                </n-ellipsis>
                <n-divider vertical />
              </li>
              <li>
                <n-icon class="mr-2" :size="14" :component="EyeOutline"></n-icon>
                <span>{{ point.views }}</span>
                <n-divider vertical />
              </li>
              <li>
                <n-icon class="mr-2" :size="14" :component="ThumbUpAltOutlined"></n-icon>
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
  </n-list>
</template>

<script setup lang="ts" name="latestPoint">
import { EyeOutline } from "@vicons/ionicons5";
import { ThumbUpAltOutlined } from "@vicons/material";
import { latestPoints } from "@/api/point";
import { formatTimeAgo } from "@/utils";
import { useRouter } from "vue-router";

const router = useRouter();

const pointList = ref([]);
const getLatestPoints = () => {
  latestPoints().then((res: any) => {
    pointList.value = res.data;
  });
};
getLatestPoints();
</script>

<style scoped lang="scss">
.action-list {
  li {
    display: flex;
    align-items: center;
  }
}
</style>
