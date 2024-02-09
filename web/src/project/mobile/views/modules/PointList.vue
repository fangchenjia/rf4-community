<template>
  <div class="pt-1 bg-white">
    <ul class="flex justify-between px-1">
      <li class="flex items-center" @click="showPickerHandle('map')">
        <h2 class="text-tiny mr-1 my-1 text-blue-500">地图</h2>
        <span class="text-tiny text-slate-500">{{ curMapSelectedText }}</span>
      </li>
      <li class="flex items-center" @click="showPickerHandle('fish')">
        <h2 class="text-tiny mx-1 my-1 text-blue-500">鱼种</h2>
        <span class="text-tiny text-slate-500">{{ curFishSelectedText }}</span>
      </li>
    </ul>
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="getPointList">
      <van-cell v-for="item in pointList" :key="item._id" :title="item.title">
        <template #label>
          <div class="flex items-center justify-between">
            <div class="flex flex-col items-start justify-between h-9">
              <p class="flex text-sm text-slate-500">
                <span>地图</span>
                <van-tag type="primary" class="ml-1">{{ item.map.name }}</van-tag>
              </p>
              <p class="flex text-sm text-slate-500">
                <span>坐标</span>
                <van-tag type="primary" class="ml-1">{{ item.position.join(",") }}</van-tag>
              </p>
              <p class="flex text-sm text-slate-500">
                <span>鱼种</span>
                <van-tag type="primary" class="ml-1">{{ item.fish[0]?.name }}</van-tag>
              </p>
              <p class="flex text-sm text-slate-500">
                <span>适合</span>
                <van-tag type="primary" v-for="tag in item.tags" :key="tag" class="ml-1">{{ tag }}</van-tag>
              </p>
            </div>
            <img class="w-12 h-9 rounded-sm" :src="item.fishImages[0] || item.fish[0].image" />
          </div>
          <ul class="flex items-center justify-between mt-1">
            <!-- 作者 -->
            <li class="flex items-center">
              <img :src="item.author.avatar" class="w-3 h-3 rounded-lg" />
              <div class="ml-1">
                {{ item.author.nickname }}
              </div>
              <van-tag type="success" class="ml-1">{{ item.author.roles[0]?.name }}</van-tag>
            </li>
            <!-- 时间 -->
            <li>
              {{ formatTimeAgo(item.createdAt) }}
            </li>
          </ul>
          <!-- 底部点赞 评论 -->
          <ul class="flex items-center justify-between mt-1">
            <li class="flex items-center">
              <div>
                <van-icon name="eye-o" />
                <span class="ml-1">{{ item.views }}</span>
              </div>
              <div class="ml-2">
                <van-icon name="good-job-o" />
                <span class="ml-1">{{ item.likes.length }}</span>
              </div>
            </li>
            <li class="flex items-center">
              <span>查看详情</span>
              <van-icon name="arrow" />
            </li>
          </ul>
        </template>
      </van-cell>
    </van-list>
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
        :columns="pickerColumns"
        :columns-field-names="{
          text: 'name',
          value: '_id',
        }"
        @cancel="showPicker = false"
        @confirm="onPickerConfirm"
      />
    </van-popup>
  </div>
</template>
<script setup name="wechatArticle" lang="ts">
import { getPoints } from "@/api/point";
import { useMapStore } from "@/store/map";
import { PickerConfirmEventParams } from "vant";
import { formatTimeAgo } from "@/utils";
const mapStore = useMapStore();

// 选择器是否显示
const showPicker = ref(false);
// 选择器数据
const pickerColumns = ref([]);
const curPickerType = ref("");
const curMapSelectedText = ref("全部地图");
const curFishSelectedText = ref("全部鱼种");
// 点位列表
const pointList = ref([]);
// 查询条件
const queryPointListParams = reactive({
  map: "",
  fish: "",
  pageNum: 1,
  pageSize: 10,
  total: 0,
});
// 下拉加载
const loading = ref(false);
const finished = ref(false);

const showPickerHandle = (type: string) => {
  curPickerType.value = type;
  if (type === "map") {
    pickerColumns.value = [
      {
        name: "全部地图",
        _id: "",
      },
      ...mapStore.maps,
    ];
  } else {
    const columns = [
      {
        name: "全部",
        _id: "",
      },
    ];
    const fishList = mapStore.maps.find((item) => item._id === queryPointListParams.map)?.fish;
    if (fishList) columns.push(...fishList);
    pickerColumns.value = columns;
  }
  showPicker.value = true;
};

const onPickerConfirm = ({ selectedOptions }: PickerConfirmEventParams) => {
  showPicker.value = false;
  if (curPickerType.value === "map") {
    // 更换地图后重置鱼种
    if (selectedOptions[0]._id !== queryPointListParams.map) {
      queryPointListParams.fish = "";
      curFishSelectedText.value = "全部鱼种";
    }
    queryPointListParams.map = selectedOptions[0]._id;
    curMapSelectedText.value = selectedOptions[0].name;
  } else {
    queryPointListParams.fish = selectedOptions[0]._id;
    curFishSelectedText.value = selectedOptions[0].name;
  }
  // 重置查询条件
  queryPointListParams.pageNum = 1;
  pointList.value = [];
  finished.value = false;
  getPointList();
};

const getPointList = () => {
  loading.value = true;
  getPoints({
    map: queryPointListParams.map,
    fish: queryPointListParams.fish,
    pageNum: queryPointListParams.pageNum,
    pageSize: queryPointListParams.pageSize,
  }).then(({ data }) => {
    queryPointListParams.pageNum++;
    pointList.value = pointList.value.concat(data?.positions);
    queryPointListParams.total = data?.total;
    loading.value = false;
    finished.value = queryPointListParams.pageNum * queryPointListParams.pageSize >= queryPointListParams.total;
  });
};
</script>
<style scoped lang="scss">
.article-title {
  border-bottom: 1px solid #eee;
}
</style>
