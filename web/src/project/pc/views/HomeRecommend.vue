<script setup lang="ts" name="homeRecommend">
import WechatArticle from "@pc/views/modules/WechatArticle.vue";
import latestPoint from "@pc/views/modules/LatestPoint.vue";
</script>

<template>
  <!-- 最新点位 -->
  <latestPoint />
  <!-- 公众号专区 -->
  <WechatArticle class="mt-6" />
</template>

<style scoped lang="scss"></style>
