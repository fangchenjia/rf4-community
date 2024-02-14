<template>
  <div class="pt-2 bg-white">
    <van-tabs v-model:active="activeWechatAccount" type="card" @change="wechatAccountChangeHandle">
      <van-tab title="研究院" :name="0"></van-tab>
      <van-tab title="俄钓4简报" :name="1"></van-tab>
    </van-tabs>
    <ul class="flex justify-between">
      <li class="flex items-center" @click="() => (showMapPicker = true)">
        <h2 class="text-tiny mx-2 my-1 text-blue-500">地图</h2>
        <span class="text-tiny text-slate-500">{{ curSelectedText }}</span>
      </li>
      <li class="flex items-center" v-if="curSelectedValue !== '0'">
        <a
          class="text-tiny mx-2 my-1 text-blue-500"
          target="_blank"
          :href="`https://mp.weixin.qq.com/mp/appmsgalbum?__biz=${wechatAccountList[activeWechatAccount].__biz}&action=getalbum&album_id=${curSelectedValue}&from_itemidx=1&nolastread=1#wechat_redirect`"
          >查看更多</a
        >
      </li>
    </ul>
    <ul class="p-1 bg-slate-50">
      <li v-for="item in wechatAccountList[activeWechatAccount].dataList" :key="item.key">
        <a class="flex items-center justify-between p-1.5 text-slate-900 bg-white mb-1 rounded" :href="item.url" target="_blank">
          <van-text-ellipsis :content="item.title" rows="2" class="flex-1 text-tiny" />
          <img class="w-6 h-6 ml-1 rounded-sm" :src="item.cover_img_1_1" />
        </a>
      </li>
    </ul>
    <van-popup v-model:show="showMapPicker" round position="bottom">
      <van-picker
        :columns="wechatAccountList[activeWechatAccount].mapAlbums"
        :columns-field-names="{
          text: 'label',
          value: 'key',
        }"
        @cancel="showMapPicker = false"
        @confirm="onMapPickerConfirm"
      />
    </van-popup>
  </div>
</template>
<script setup name="wechatArticle" lang="ts">
import { getWechatArticleList, wechatArticleListLatest } from "@/api/wechat";
import { accountList, Account, Article } from "@/config/wechatArticle";
import { PickerConfirmEventParams, showLoadingToast } from "vant";
import { cloneDeep } from "lodash-es";

// 公众号选择
const activeWechatAccount = ref(0);
const wechatAccountChangeHandle = (name: number) => {
  activeWechatAccount.value = name;
  // 重置查询条件
  curSelectedValue = "0";
  curSelectedText.value = "全部地图";
  mapSelectHandle();
};
// 地图选择
const showMapPicker = ref(false);
const onMapPickerConfirm = ({ selectedOptions }: PickerConfirmEventParams) => {
  showMapPicker.value = false;
  if (selectedOptions[0].key === curSelectedValue) return;
  curSelectedValue = selectedOptions[0].key;
  curSelectedText.value = selectedOptions[0].label;
  mapSelectHandle();
};

let curSelectedValue = "0";
const curSelectedText = ref("全部地图");
// 公众号列表
type ExtendedAccount = Account & {
  dataList: Article[]; // 替换 YourType 为 dataList 的元素的实际类型
};
const wechatAccountList = ref<ExtendedAccount[]>(
  accountList.map((account) => {
    const cloneAccount = cloneDeep(account);
    cloneAccount.mapAlbums.unshift({
      label: "全部地图",
      key: "0",
    });
    return {
      ...cloneAccount,
      dataList: [],
    };
  })
);

// 最新文章(全部地图)
let latestArticleData: Record<string, any[]> = null;
wechatArticleListLatest().then(({ data }) => {
  latestArticleData = data;
  // 默认展示最新文章(全部地图)
  wechatAccountList.value.forEach((account: any) => {
    account.dataList = latestArticleData[account.__biz] || [];
  });
});

// 选择地图
const mapSelectHandle = () => {
  const album_id: string = curSelectedValue;
  // 当前公众号
  const curAccount = wechatAccountList.value[activeWechatAccount.value];
  // 如果是最新文章
  if (album_id === "0") {
    curAccount.dataList = latestArticleData[curAccount.__biz] || [];
    return;
  }
  const toast = showLoadingToast({
    message: "加载中...",
    forbidClick: true,
    loadingType: "spinner",
    duration: 0,
  });
  getWechatArticleList({
    __biz: curAccount.__biz,
    album_id,
    count: 10,
  })
    .then((res) => {
      // 如果只有一个数据，返回的是对象，需要转成数组
      if (res.data?.getalbum_resp?.article_list?.length === undefined) {
        res.data.getalbum_resp.article_list = [res.data.getalbum_resp.article_list];
      }
      curAccount.dataList = res.data?.getalbum_resp?.article_list || [];
    })
    .finally(() => {
      toast.close();
    });
};
</script>
<style scoped lang="scss"></style>
