<script setup lang="ts">
import { ArrowForwardIosRound } from '@vicons/material'
import { getWechatArticleList } from '@/api/wechat'
import { accountList } from '@/config/wechatArticle'
import { useThemeVars } from 'naive-ui'
import moment from 'moment'
const themeVars = useThemeVars()


const wechatAccountList: any = ref(accountList.map(account => {
  return {
    ...account,
    curMapAlbum: account.mapAlbums[0],
    dataList: [],
  }
}))
const mapSelectHandle = (account: any, album_id: string) => {
  account.curMapAlbum = account.mapAlbums.find((album: any) => album.key === album_id)
  getWechatArticleList({
    __biz: account.__biz,
    album_id,
    count: 6,
  }).then(res => {
    // 如果只有一个数据，返回的是对象，需要转成数组
    if (res.data?.getalbum_resp?.article_list?.length === undefined) {
      res.data.getalbum_resp.article_list = [res.data.getalbum_resp.article_list]
    }
    account.dataList = res.data?.getalbum_resp?.article_list || []
  })
}

// 

</script>

<template>
  <div class="p-6">
    <n-thing>
      <template #header> <span class="flex items-center">公众号专区<n-icon :size="20" :component="ArrowForwardIosRound"></n-icon></span></template>
      <n-thing v-for="account in wechatAccountList" :key="account.__biz">
        <!-- 公众号头像 -->
        <template #avatar>
          <n-avatar
            round
            size="medium"
            :src="account.avatar"
          /> 
        </template>
        <!-- 公众号名称 -->
        <template #header> 
          <span > 
            {{ account.name }}
          </span>
          <span class="ml-3 text-xs font-light">
            {{ account.desc }}
          </span>
        </template>
        <!-- 公众号更多按钮 -->
        <template #header-extra>
          <n-button text size="small" tag="a" target="_blank" :href="`https://mp.weixin.qq.com/mp/appmsgalbum?__biz=${account.__biz}&action=getalbum&album_id=${account.curMapAlbum.key}&from_itemidx=1&nolastread=1#wechat_redirect`">
            更多
            <n-icon :size="20" :component="ArrowForwardIosRound"></n-icon>
          </n-button>
        </template>
        <!-- 公众号选择地图 -->
        <template #description>
          <n-dropdown
            placement="bottom-start"
            trigger="click"
            size="small"
            :options="account.mapAlbums"
            :on-select="(album_id) => {mapSelectHandle(account, album_id)}"
          >
            <span> {{ account.curMapAlbum.label }} </span>
          </n-dropdown>
        </template>
        <n-empty description="什么也没有" v-if="account.dataList.length === 0">
        </n-empty>
        <ul v-else class="flex flex-wrap justify-between">
          <li v-for="item in account.dataList" :key="item.key" class="flex items-center justify-around py-3 album-item">
            <n-avatar :size="80" :src="item.cover_img_1_1" /> 
            <div class="w-2/3 ml-2">
              <n-ellipsis class="text-base min-w-full" :tooltip="false">
                <!-- 如果有() 或者 【】则去掉 -->
                {{ item?.title.replace(/(\(|\（)[^(\)|\）]*(\)|\）)/g, '').replace(/(\[)[^(\])]*(\])/g, '')  }}
              </n-ellipsis>
              <div class="flex mt-2 items-center">
                <span class="ml-2 mr-4">
                  {{ moment(item.create_time * 1000).format('YYYY-MM-DD') }}
                </span>
                <n-button text size="small" tag="a" target="_blank" :href="item.url">
                  查看详情
                </n-button>
              </div>
            </div>
          </li>
          <!-- 空白填充  -->
          <div style="width: 30%;"></div>
          <div style="width: 30%;"></div>
        </ul>
      </n-thing>
    </n-thing>
  </div>
</template>

<style scoped lang="scss">
.album-item {
  width: 30%;
  border-top: 1px solid v-bind('themeVars.borderColor');
  // 最后第3-6个额外加个border-bottom 排除最后俩个空白填充
  &:nth-last-child(-n+6):not(:nth-last-child(-n+2)) {
    border-bottom: 1px solid v-bind('themeVars.borderColor');
  }
}

</style>
