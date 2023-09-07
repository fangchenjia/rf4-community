<template>
  <n-thing>
    <template #header>
      <span class="flex items-center"
        >公众号专区<n-icon :size="20" :component="ArrowForwardIosRound"></n-icon></span
    ></template>
    <n-thing v-for="account in wechatAccountList" :key="account.__biz">
      <!-- 公众号头像 -->
      <template #avatar>
        <n-avatar round size="medium" :src="account.avatar" />
      </template>
      <!-- 公众号名称 -->
      <template #header>
        <span>
          {{ account.name }}
        </span>
        <span class="ml-3 text-xs font-light">
          {{ account.desc }}
        </span>
      </template>
      <!-- 公众号更多按钮 -->
      <template #header-extra>
        <n-button
          v-show="account.curMapAlbum.key !== '0'"
          text
          size="small"
          tag="a"
          target="_blank"
          :href="`https://mp.weixin.qq.com/mp/appmsgalbum?__biz=${account.__biz}&action=getalbum&album_id=${account.curMapAlbum.key}&from_itemidx=1&nolastread=1#wechat_redirect`"
        >
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
          :menu-props="() => ({ style: 'max-height: 250px; overflow: scroll;' })"
          :on-select="(album_id: string) => {mapSelectHandle(account, album_id)}"
        >
          <span class="flex items-center">
            {{ account.curMapAlbum.label }}
            <label class="ml-2" v-show="account.curMapAlbum.key === '0'">选择地图</label>
            <n-icon :size="18" :component="KeyboardArrowDownTwotone"></n-icon>
          </span>
        </n-dropdown>
      </template>
      <n-empty description="什么也没有" v-if="account.dataList.length === 0"> </n-empty>
      <ul v-else class="flex flex-wrap justify-between">
        <li
          v-for="item in account.dataList"
          :key="item.key"
          class="flex items-center justify-around py-3 album-item"
        >
          <n-avatar :size="80" :src="item.cover_img_1_1" />
          <div class="w-2/3 ml-2">
            <n-ellipsis class="text-base min-w-full" :tooltip="false">
              <!-- 如果有() 或者 【】则去掉 -->
              {{ item?.title }}
            </n-ellipsis>
            <div class="flex mt-2 items-center">
              <span class="ml-2 mr-4">
                {{ moment(item.create_time * 1000).format("YYYY-MM-DD") }}
              </span>
              <n-button text size="small" tag="a" target="_blank" :href="item.url">
                查看详情
              </n-button>
            </div>
          </div>
        </li>
        <!-- 空白填充  -->
        <div style="width: 30%"></div>
        <div style="width: 30%"></div>
      </ul>
    </n-thing>
  </n-thing>
</template>
<script setup name="wechatArticle" lang="ts">
import { ArrowForwardIosRound, KeyboardArrowDownTwotone } from '@vicons/material'
import { getWechatArticleList, wechatArticleListLatest } from '@/api/wechat'
import { accountList } from '@/config/wechatArticle'
import { useThemeVars } from 'naive-ui'
import moment from 'moment'
const themeVars = useThemeVars()
// 公众号列表
const wechatAccountList: any = ref(accountList.map(account => {
  account.mapAlbums.unshift({
    label: '最新文章',
    key: '0',
  })
  return {
    ...account,
    curMapAlbum: account.mapAlbums[0],
    dataList: [],
  }
}))

// 最新文章
let latestArticleData: any = null
wechatArticleListLatest().then(({data}) => {
  latestArticleData = data 
  // 默认展示最新文章
  wechatAccountList.value.forEach((account: any) => {
    account.dataList = latestArticleData[account.__biz] || []
  })
})

// 选择地图
const mapSelectHandle = (account: any, album_id: string) => {
  if (account.curMapAlbum.key === album_id) return
  account.curMapAlbum = account.mapAlbums.find((album: any) => album.key === album_id)
  // 如果是最新文章
  if (album_id === '0') {
    account.dataList = latestArticleData[account.__biz] || []
    return
  }
  
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
</script>
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
