<template>
  <div class="h-screen bg-white p-1.5">
    <h2 class="text-base">{{ pointDetail.title }}</h2>
    <!-- 作者 -->
    <div class="flex items-center justify-between text-slate-500 text-sm mt-1">
      <p>
        作者：
        <span class="mr-1 text-blue-400" @click="router.push(`/user-detail/${pointDetail.author?._id}`)">{{ pointDetail.author?.nickname }}</span>
        <span class="mr-1">{{ formatTimeAgo(pointDetail.createdAt) }}</span>
      </p>
      <div class="flex items-center mr-2">
        <span>{{ pointDetail.views }} 浏览</span>
      </div>
    </div>
    <!-- 描述 -->
    <div class="mt-1 text-sm text-slate-600">{{ pointDetail.description }}</div>
    <!-- 地图、点位 -->
    <div class="mt-1 text-sm">
      <span>地图：</span>
      <van-tag type="danger" class="mr-1">{{ pointDetail.map?.name }}</van-tag>
      <van-tag type="warning" class="mr-1">{{ pointDetail.position?.join(",") }}</van-tag>
      <span class="text-blue-600" @click="() => (showMap = !showMap)">[{{ showMap ? "隐藏" : "查看" }}坐标]</span>
    </div>
    <MapEditor class="mt-1" v-show="showMap" ref="mapEditor" :default-map-key="null" :showMapSelector="false" :showPosition="false" :readOnly="true" />
    <div class="rounded bg-slate-50 p-1 text-sm mt-1">
      <!-- 标签 -->
      <div>
        <span>标签：</span>
        <van-tag type="primary" class="mr-1" v-for="tag in pointDetail.tags" :key="tag">
          {{ tag }}
        </van-tag>
      </div>
      <!-- 鱼种 -->
      <div class="mt-1">
        <span>鱼种：</span>
        <van-tag type="success" class="mr-1" v-for="fish in pointDetail.fish" :key="fish.name">
          {{ fish.name }}
        </van-tag>
      </div>
      <van-row class="position-item">
        <van-col span="12" class="mt-1">
          <span>渔具：</span>
          <van-tag type="warning" class="mr-1">{{ pointDetail.fishingTackle?.dictName }}</van-tag>
        </van-col>
        <van-col span="12" class="mt-1">
          <span>钓组：</span>
          <van-tag type="warning" class="mr-1">{{ pointDetail.fishingGroup?.dictName }}</van-tag>
        </van-col>
        <van-col span="12" v-if="pointDetail.line">
          <p class="mt-1 flex items-start">
            <span>引线：</span>
            <van-tag type="warning" class="mr-1">{{ pointDetail.line }}</van-tag>
          </p>
        </van-col>
        <van-col span="12" v-if="pointDetail.baits">
          <p class="mt-1 flex items-start">
            <span>鱼饵：</span>
            <van-tag type="warning" class="mr-1">{{ pointDetail.baits }}</van-tag>
          </p>
        </van-col>
        <van-col span="12" v-if="pointDetail.hook">
          <p class="mt-1 flex items-start">
            <span>钩子：</span>
            <van-tag type="warning" class="mr-1">{{ pointDetail.hook }}</van-tag>
          </p>
        </van-col>
        <van-col span="12" v-if="pointDetail.distance">
          <p class="mt-1 flex items-start">
            <span>卡米：</span>
            <van-tag type="warning" class="mr-1">{{ pointDetail.distance }}</van-tag>
          </p>
        </van-col>
        <van-col span="12" v-if="pointDetail.speed" class="mt-1">
          <span>转速：</span>
          <van-tag type="warning" class="mr-1">{{ pointDetail.speed }}</van-tag>
        </van-col>
        <van-col span="12" v-if="pointDetail.time" class="mt-1">
          <span>时间：</span>
          <van-tag type="warning" class="mr-1">{{ pointDetail.time }}</van-tag>
        </van-col>
        <van-col span="12" v-if="pointDetail.temperature">
          <p class="mt-1 flex items-start">
            <span>温度：</span>
            <van-tag type="warning" class="mr-1">{{ pointDetail.temperature }}</van-tag>
          </p>
        </van-col>
      </van-row>
    </div>
    <van-tabs type="card" class="mt-1 picture-nav">
      <van-tab title="装备截图">
        <template v-if="pointDetail.equipmentImages?.length">
          <van-image v-for="item in pointDetail.equipmentImages" :key="item" width="100%" height="60%" class="mt-1" :src="item" />
        </template>
        <van-empty v-else description="投稿人没有上传装备截图" />
      </van-tab>
      <van-tab title="鱼获截图">
        <template v-if="pointDetail.fishImages?.length">
          <van-image v-for="item in pointDetail.fishImages" :key="item" width="100%" height="60%" class="mt-1" :src="item" />
        </template>
        <van-empty v-else description="投稿人没有上传鱼获截图" />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script setup lang="ts" name="pointDetail">
import MapEditor from "@mobile/components/MapEditor/MapEditor.vue";
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

const showMap = ref(true); // 是否显示地图

onMounted(() => {
  getPointDetail(route.params.id as string, { showLoading: true }).then((res) => {
    pointDetail.value = res.data;
    mapEditor.value.setMap(res.data.map.name);
    mapEditor.value.setJson(JSON.parse(res.data.canvasJson));
    mapEditor.value.setPointList([
      {
        x: res.data.position[0],
        y: res.data.position[1],
        options: {
          stroke: "white",
          fill: "green",
          radius: 1,
        },
      },
    ]);
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
.picture-nav {
  :deep(.van-tabs__nav--card) {
    margin: 0;
  }
}
.position-item {
  :deep(.van-tag) {
    max-width: 120px;
  }
}
</style>
