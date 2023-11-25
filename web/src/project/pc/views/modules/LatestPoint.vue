<template>
  <PointList :point-list="pointList">
    <template #header> 最新点位 </template>
  </PointList>
</template>

<script setup lang="ts" name="latestPoint">
import PointList from "@pc/components/PointList.vue";
import { latestPoints } from "@/api/point";

const pointList = ref([]);
const getLatestPoints = () => {
  latestPoints().then((res: any) => {
    pointList.value = res.data;
  });
};
getLatestPoints();
</script>
