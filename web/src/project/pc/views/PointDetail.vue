<template>
  <MainLayout>
    <template #left-nav>
      <div class="flex flex-col w-36 items-end mr-6">
        <n-badge :value="pointDetail.likes?.length">
          <n-button secondary class="mb-6" :type="pointDetail.likes?.includes(userStore.userInfo._id) ? 'primary' : 'default'" circle>
            <n-icon :component="ThumbUpAltOutlined" :size="20" @click="likePointHandle"></n-icon>
          </n-button>
        </n-badge>
        <n-badge :value="positionCommentRef?.commentList?.reduce((pre, cur) => pre + 1 + cur.children.length, 0)" :max="99">
          <n-button secondary circle> <n-icon :component="MessageDots" :size="20"></n-icon> </n-button>
        </n-badge>
      </div>
    </template>
    <template #main>
      <n-card :bordered="false" class="rounded" :title="pointDetail.title">
        <!-- meta-box -->
        <div class="flex items-center text-slate-500">
          作者：
          <span class="mr-2 text-blue-400" @click="router.push(`/user-detail/${pointDetail.author?._id}`)">{{ pointDetail.author?.nickname }}</span>
          <span class="mr-2">{{ formatTimeAgo(pointDetail.createdAt) }}</span>
          <div class="flex items-center mr-2">
            <n-icon class="mr-1" :size="14" :component="EyeOutline"></n-icon>
            <span>{{ pointDetail.views }}</span>
          </div>
          <div>
            <span>标签：</span>
            <n-tag class="mr-2" type="info" v-for="tag in pointDetail.tags" size="small" :key="tag">
              {{ tag }}
            </n-tag>
          </div>
        </div>
        <p class="mt-4">{{ pointDetail.description }}</p>
        <!-- content -->
        <ul class="text-slate-500 mt-4 point-item">
          <li>
            地图：<n-tag size="small" type="warning">{{ pointDetail.map?.name }}</n-tag>
          </li>
          <li>点位：{{ pointDetail.position }}</li>
          <li>鱼种：{{ pointDetail.fish?.map((item) => item.name).join("、") }}</li>
          <li>渔具：{{ pointDetail.fishingTackle?.dictName }}</li>
          <li>钓组：{{ pointDetail.fishingGroup?.dictName }}</li>
          <li v-if="pointDetail.line">引线：{{ pointDetail.line }}</li>
          <li v-if="pointDetail.baits">鱼饵：{{ pointDetail.baits }}</li>
          <li v-if="pointDetail.hook">钩子：{{ pointDetail.hook }}</li>
          <li v-if="pointDetail.distance">卡米：{{ pointDetail.distance }}</li>
          <li v-if="pointDetail.speed">转速：{{ pointDetail.speed }}</li>
          <li v-if="pointDetail.time">时间：{{ pointDetail.time }}</li>
          <li v-if="pointDetail.temperature">温度：{{ pointDetail.temperature }}</li>
          <li>
            鱼获截图：
            <div class="flex flex-wrap mt-2">
              <n-image v-for="item in pointDetail.fishImages" :key="item" width="100" height="60" class="mr-2" :src="item" />
            </div>
          </li>
          <li>
            装备截图：
            <div class="flex flex-wrap mt-2">
              <n-image v-for="item in pointDetail.equipmentImages" :key="item" width="100" height="60" class="mr-2" :src="item" />
            </div>
          </li>
        </ul>
        <!-- map -->
        <MapEditor ref="mapEditor" :default-map-key="null" :showMapSelector="false" :show-menu="false" />
      </n-card>
      <PositionComment ref="positionCommentRef" :positionId="route.params.id as string" class="mt-6" />
    </template>
    <template #right-aside>
      <div class="w-64">
        <n-card :bordered="false" class="rounded" content-style="display: flex; align-items: center; justify-content: space-around; padding: 1rem;"> </n-card>
      </div>
    </template>
  </MainLayout>
</template>
<script setup lang="ts" name="pointDetail">
import MapEditor from "@pc/components/MapEditor/MapEditor.vue";
import MainLayout from "../components/MainLayout.vue";
import PositionComment from "./modules/PositionComment.vue";
import { ThumbUpAltOutlined } from "@vicons/material";
import { EyeOutline } from "@vicons/ionicons5";
import { MessageDots } from "@vicons/tabler";
import { getPointDetail, likePoint } from "@/api/point";
import { useRoute, useRouter } from "vue-router";
import { PointDetail } from "@/types/point";
import { formatTimeAgo } from "@/utils";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();

const route = useRoute();

const router = useRouter();

const mapEditor = ref();

const positionCommentRef = ref();

const pointDetail = ref<PointDetail>({} as PointDetail);

onMounted(() => {
  getPointDetail(route.params.id as string, { showLoading: true }).then((res) => {
    pointDetail.value = res.data;
    mapEditor.value.setMap(res.data.map.name);
    mapEditor.value.setJson(JSON.parse(res.data.canvasJson));
    mapEditor.value.setPoint(res.data.position);
  });
});

// 点赞
const likePointHandle = () => {
  likePoint(pointDetail.value._id).then(({ data }) => {
    pointDetail.value.likes = data;
  });
};
</script>
<style scoped lang="scss">
.point-item {
  display: flex;
  flex-wrap: wrap;
  li {
    width: 50%;
    margin-bottom: 8px;
  }
}
</style>
