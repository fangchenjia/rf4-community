<script setup lang="ts">
import AppHeader from "@/project/mobile/components/AppHeader.vue";
// import MapEditor from "@/project/mobile/components/MapEditor/MapEditor.vue";
import WechatArticle from "@/project/mobile/views/modules/WechatArticle.vue";
import PointList from "@/project/mobile/views/modules/PointList.vue";
const active = ref(0);
</script>

<template>
  <AppHeader />
  <van-tabs v-model:active="active" shrink class="mt-1">
    <van-tab title="最新投稿">
      <div class="px-1 bg-white">
        <PointList />
      </div>
    </van-tab>
    <van-tab title="公众号">
      <WechatArticle />
    </van-tab>
  </van-tabs>
</template>
