<template>
  <n-form ref="formRef" :model="queryFormModel" label-width="auto" size="small">
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="12" label="地图" path="map">
        <n-select v-model:value="queryFormModel.map" placeholder="选择地图" value-field="_id" label-field="name" :options="mapStore.maps" :on-update:value="mapSelectHandle" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="鱼种" path="fish">
        <n-select
          v-model:value="queryFormModel.fish"
          placeholder="选择鱼种"
          value-field="_id"
          label-field="name"
          :options="fishSelectOptions"
          :on-update:value="fishSelectHandle"
        />
      </n-form-item-gi>
    </n-grid>
  </n-form>
  <div class="w-full">
    <MapEditor :showMapSelector="false" ref="mapEditorRef" :showMenu="false" />
  </div>
  <PointList :pointList="pointList" class="mt-6">
    <template #header>
      <div class="flex items-center text-base"><n-icon :component="SearchLocation"></n-icon> <span class="ml-2">相关点位</span></div>
    </template>
  </PointList>
  <n-card ref="pointDetailRef" v-show="pointDetailShow" contentStyle="padding: 0" size="small">
    <span class="text-xs px-1 cursor-pointer" @click="router.push(`/point-detail/${clickedPoint._id}`)">
      {{ clickedPoint?.title }}
    </span>
  </n-card>
</template>

<script setup lang="ts" name="pointDistribution">
import MapEditor from "@pc/components/MapEditor/MapEditor.vue";
import { getPoints } from "@/api/point";
import { SearchLocation } from "@vicons/fa";
import PointList from "@pc/components/PointList.vue";
import { useMapStore } from "@/store/map";
import { useRouter } from "vue-router";

const router = useRouter();

const mapStore = useMapStore();

const mapEditorRef = ref();

const pointDetailRef = ref();

const pointDetailShow = ref(false);

const clickedPoint = ref();

const queryFormModel = ref({
  map: mapStore.maps[0]?._id,
  fish: "",
});

const fishSelectOptions = ref([
  {
    name: "全部",
    _id: "",
  } as any,
]);

const mapSelectHandle = (value) => {
  queryFormModel.value.map = value;
  const selectedMap = mapStore.maps.find((item) => item._id === value);
  fishSelectOptions.value = [
    {
      name: "全部",
      _id: "",
    } as any,
    ...selectedMap.fish,
  ];
  queryFormModel.value.fish = "";
  // 切换地图编辑器地图
  if (mapEditorRef.value) {
    mapEditorRef.value.setMap(selectedMap.name);
  }
  updatePoints();
};

const fishSelectHandle = (value) => {
  queryFormModel.value.fish = value;
  updatePoints();
};

const pointList = ref([]);

const updatePoints = () => {
  getPoints(queryFormModel.value, { showLoading: true }).then((res: any) => {
    pointList.value = res.data;
    const locationArray = pointList.value.map((item) => {
      return {
        x: item.position[0],
        y: item.position[1],
        options: {
          stroke: "white",
          fill: "red",
          radius: 1,
          onClick: (opt) => {
            if (mapEditorRef.value) {
              clickedPoint.value = item;
              pointDetailShow.value = true;
              const dom = pointDetailRef.value?.$el;
              mapEditorRef.value?.setDom(dom);
              const { x, y } = opt.pointer;
              mapEditorRef.value?.showDom(x, y);
            }
          },
        },
      };
    });
    if (mapEditorRef.value) {
      mapEditorRef.value.setPointList(locationArray);
    }
  });
};

onMounted(() => {
  updatePoints();
});
</script>
