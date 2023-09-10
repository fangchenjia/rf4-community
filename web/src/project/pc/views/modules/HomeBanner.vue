<template>
  <n-carousel
    class="my-6"
    effect="card"
    prev-slide-style="transform: translateX(-150%) translateZ(-400px);"
    next-slide-style="transform: translateX(50%) translateZ(-400px);"
    style="height: 240px"
    show-dots
    autoplay
  >
    <n-carousel-item :style="{ width: '60%' }" v-for="(url,index) in imgList" :key="index">
      <img
        class="carousel-img"
        :src="url"
      >
    </n-carousel-item>
  </n-carousel>
</template>

<script setup lang="ts" name="homeBanner">
const imgList = [
  'http://rf4game.com/wp-content/uploads/2022/10/gameplay06.jpg',
  'http://rf4game.com/wp-content/uploads/2022/10/kuori01.jpg',
  'http://rf4game.com/wp-content/uploads/2022/10/gameplay05.jpg',
  'http://rf4game.com/wp-content/uploads/2022/10/gameplay12.jpg',
]

</script>

<style scoped>
.carousel-img {
  border-radius: 6px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>