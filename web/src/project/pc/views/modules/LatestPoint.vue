<template>
  <PointList :point-list="pointList">
    <template #header> 最新点位 </template>
  </PointList>
  <div class="flex justify-end mt-4 mr-4">
    <n-pagination v-model:page="paginationParam.pageNum" :item-count="paginationParam.total" :page-size="paginationParam.pageSize" :on-update:page="pageUpdateHandle" />
  </div>
</template>

<script setup lang="ts" name="latestPoint">
import PointList from "@pc/components/PointList.vue";
import { getPoints } from "@/api/point";
const paginationParam = ref({
  pageNum: 1,
  pageSize: 5,
  total: 0,
});

const pointList = ref([]);
const getLatestPoints = () => {
  getPoints({
    pageNum: paginationParam.value.pageNum,
    pageSize: paginationParam.value.pageSize,
  }).then(({ data }) => {
    pointList.value = data?.positions;
    paginationParam.value.total = data?.total;
  });
};

const pageUpdateHandle = (page: number) => {
  paginationParam.value.pageNum = page;
  getLatestPoints();
};
getLatestPoints();
</script>
