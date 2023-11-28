<template>
  <n-thing>
    <template #avatar>
      <n-avatar round size="large" :src="userInfo.avatar"> </n-avatar>
    </template>
    <template #header>
      {{ userInfo.nickname }}
      <span class="ml-2 text-sm text-blue-500">
        {{ userInfo.roles?.map((item: any) => item.name).join("、") }}
      </span>
    </template>
    <template #description>
      {{ userInfo.description || "这家伙很懒，什么都没留下" }}
    </template>
    <PointList :pointList="pointList" class="mt-6">
      <template #header>
        <div class="flex items-center text-base"><n-icon :component="Book"></n-icon> <span class="ml-2">他的投稿</span></div>
      </template>
    </PointList>
  </n-thing>
</template>
<script setup lang="ts" name="userDetail">
import { Book } from "@vicons/fa";
import PointList from "@pc/components/PointList.vue";
import { userDetail } from "@/api/user";
import { userPoints } from "@/api";
import { UserInfo } from "@/types/user";
import { useRoute } from "vue-router";

const route = useRoute();

const userInfo = ref<UserInfo>({} as UserInfo);
const pointList = ref([]);

// 监听路由params变化 并且自执行
watch(
  () => route.params,
  () => {
    const userId = route.params.id as string;
    if (!userId) {
      return;
    }
    userDetail(userId, {}, { showLoading: true }).then((res) => {
      userInfo.value = res.data;
    });
    userPoints(userId).then((res) => {
      pointList.value = res.data;
    });
  },
  { deep: true, immediate: true }
);
</script>
<style scoped lang="scss"></style>
