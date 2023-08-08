<template>
  <!-- 待开发页面 -->
  <div class="flex flex-col items-center justify-center h-full">
    <n-icon :component="LaptopMacFilled" size="64" />
    <span class="mt-4 text-xl">页面开发中...</span>
    <!-- github地址、联系方式 -->
    <div class="flex">
      <p class="mr-2"><n-icon :component="Qq"></n-icon> 2362414624</p>
      <p class="mr-2"><n-icon :component="MobileAlt"></n-icon> 18711003418</p>
      <p><n-icon :component="Github"></n-icon> <a href="https://github.com/fangchenjia" target="_blank"> Github</a></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LaptopMacFilled } from '@vicons/material'
import { Github, Qq, MobileAlt} from '@vicons/fa'
</script>