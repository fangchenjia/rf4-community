<template>
  <n-card class="mt-4" size="small" :bordered="false" header-style="font-size: 14px" content-style="padding: 0">
    <template #header>
      <div class="flex items-center"><n-icon :size="14" :component="UserRegular"></n-icon> <span class="ml-2 font-normal">本月贡献榜</span></div>
    </template>
    <ul class="p-1">
      <li
        v-for="(item, index) in !isExpand ? rankList.slice(0, 5) : rankList"
        :key="item.user._id"
        class="flex justify-between items-center gap-x p-2 hover:bg-gray-100 dark:hover:bg-neutral-800"
      >
        <div class="flex gap-x items-center">
          <n-gradient-text :size="20" :type="index === 0 ? 'error' : index <= 1 ? 'warning' : 'info'" class="mr-4">
            {{ index + 1 }}
          </n-gradient-text>
          <img class="h-8 w-8 flex-none bg-gray-50 rounded-full" :src="item.user.avatar" alt="" />
          <div class="flex-auto pl-3">
            <p class="my-0 text-sm">
              <n-ellipsis class="text-blue-500" style="max-width: 100px" :tooltip="false"> {{ item.user.nickname }} </n-ellipsis>
            </p>
            <n-ellipsis class="text-sm text-gray-500" style="max-width: 140px" :tooltip="false"> 累计投稿: {{ item.count }} </n-ellipsis>
          </div>
        </div>
        <n-button size="tiny" round type="primary" secondary @click="router.push(`/user-detail/${item.user._id}`)">查看</n-button>
      </li>
      <!-- 暂无数据 -->
      <li v-if="!rankList.length" class="flex justify-center items-center p-2 hover:bg-gray-100 dark:hover:bg-neutral-800">
        <n-gradient-text>本月没人投稿！！！</n-gradient-text>
      </li>
      <!-- 展示全部 -->
      <li v-if="rankList.length >= 5" class="flex justify-center items-center p-2 hover:bg-gray-100 dark:hover:bg-neutral-800" @click="isExpand = !isExpand">
        <n-button text type="primary">
          {{ isExpand ? "收起" : "查看所有" }} <n-icon :component="isExpand ? AngleDoubleUp : AngleDoubleDown" :size="12" class="ml-1"></n-icon
        ></n-button>
      </li>
    </ul>
  </n-card>
</template>

<script setup name="userPointRank" lang="ts">
import { AngleDoubleDown, AngleDoubleUp } from "@vicons/fa";
import { UserRegular } from "@vicons/fa";
import { userRank } from "@/api/point";
import { useRouter } from "vue-router";

const router = useRouter();

const rankList = ref([]);

const isExpand = ref(false);

onMounted(() => {
  userRank({ timeType: "month" }).then((res) => {
    rankList.value = res.data;
  });
});
</script>
