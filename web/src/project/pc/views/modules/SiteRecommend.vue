<template>
  <n-card class="mt-4" size="small" :bordered="false" header-style="font-size: 14px">
    <template #header>
      <div class="flex items-center"><n-icon :size="14" :component="Link"></n-icon> <span class="ml-2 font-normal">网站推荐</span></div>
    </template>
    <ul class="p-0" v-for="item in recommendList" :key="item.title">
      <li class="flex justify-between gap-x mb-6">
        <a class="flex gap-x items-center" :href="item.url" target="_blank">
          <img class="h-8 w-8 flex-none bg-gray-50" :src="item.icon" alt="">
          <div class="flex-auto pl-3">
            <p class="my-0 text-sm" >{{ item.title }}</p>
            <n-ellipsis class="text-sm" style="max-width: 150px" :tooltip="false">
              {{ item.desc }}
            </n-ellipsis>
          </div>
        </a>
      </li>
    </ul>
  </n-card>
</template>

<script setup name="SiteRecommend" lang="ts">
import { Link } from '@vicons/fa'

const recommendList = [
  {
    title: '俄罗斯钓鱼4官网',
    desc: '下载独立端 | 官方公告',
    url: 'https://rf4game.com/cn/',
    icon: 'https://rf4game.com/wp-content/themes/rf4/img/RF4_logo_s.png'
  },
  {
    title: '俄罗斯钓鱼4',
    desc: '交互式地圖 | 咖啡厅订单选项',
    url: 'https://rf4.info/cn/',
    icon: 'https://rf4.info/img/RF4_logo_s.png'
  },
  {
    title: 'VK社区',
    desc: 'vk点位分享',
    url: 'https://vk.com/rf4chinaspot',
    icon: 'https://sun6-21.userapi.com/s/v1/ig2/Qq0v5OWtmenPX_UruugbwGZf4ZURlLD47DUW3B5imE4mTREvK_miJgF61EhWaRri71IbeH-SS7UgqHqZJbvWXZdk.jpg?size=200x200&quality=95&crop=35,30,764,764&ava=1'
  },
  {
    title: '俄罗斯钓鱼4 中文wiki',
    desc: '该wiki由【冰山】维护',
    url: 'https://rf4.gamekee.com/',
    icon: 'https://cdnimg.gamekee.com/wiki2.0/images/w_128/h_128/50209/236746/2023/8/11/583390.png?x-image-process=image/resize,m_lfit,h_300,w_300'
  },
  {
    title: '钓鱼统计数据',
    desc: '俄钓4的一些统计数据',
    url: 'https://cn.rf4-stat.ru/',
    icon: 'https://cn.rf4-stat.ru/images/logo.jpg'
  }
]
</script>