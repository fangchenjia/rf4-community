<template>
  <div>
    <!-- 地图编辑器 -->
    <div id="workspace">
      <canvas id="canvas"></canvas>
    </div>
    <van-cell v-if="showMapSelector" title="地图" is-link :value="checkedMapText" icon="map-marked" @click="() => (showMapPicker = true)" />
    <van-cell title="坐标" icon="location" class="position">
      <template #value>
        <div class="flex">
          <van-field v-model="curPoint[0]" placeholder="X" @blur="echoPositionMarker" />
          <van-field v-model="curPoint[1]" placeholder="Y" @blur="echoPositionMarker" />
        </div>
      </template>
    </van-cell>
    <van-popup v-model:show="showMapPicker" round position="bottom">
      <van-picker
        :columns="mapItems"
        :columns-field-names="{
          text: 'label',
          value: 'value',
        }"
        @cancel="showMapPicker = false"
        @confirm="onMapPickerConfirm"
      />
    </van-popup>
  </div>
</template>

<script setup name="mapEditor" lang="ts">
import { mapItems } from "@/config/map";
import { onMounted, ref, watch } from "vue";
import Editor from "@/common/MapEditor/core";
import WorkspacePlugin from "@/common/MapEditor/plugins/WorkspacePlugin";
import MapPlugin from "@/common/MapEditor/plugins/MapPlugin";
import DomPlugin from "@/common/MapEditor/plugins/DomPlugin";
import { fabric } from "fabric";
import { PickerConfirmEventParams } from "vant";

// 定义props
const props = defineProps({
  defaultMapKey: {
    type: String,
    default: "0",
  },
  showMapSelector: {
    type: Boolean,
    default: true,
  },
  position: {
    type: [],
    default: () => {
      return [0, 0];
    },
  },
});

// 暴露组件方法
defineExpose({
  setMap: (val: string) => {
    editor.setCurMap(val);
  },
  setJson: (val: any) => {
    editor?.importObjects(val);
  },
  setPointList: (pointList: { x: number; y: number; options?: fabric.ICircleOptions }[]) => {
    editor?.clear();
    editor?.addMarkersByPosition(pointList);
  },
  setDom: (dom: HTMLElement) => {
    editor?.setDom(dom);
  },
  showDom: (x: number, y: number) => {
    editor?.showDom(x, y);
  },
  hideDom: () => {
    editor?.hideDom();
  },
});

const $emits = defineEmits(["update:position"]);

// 回显坐标
const echoPositionMarker = () => {
  editor?.setMapClickPosition({ x: Number(curPoint.value[0]), y: Number(curPoint.value[1]) });
};
// 选择地图
const showMapPicker = ref(false);
const checkedMapText = ref("");
const onMapPickerConfirm = ({ selectedOptions }: PickerConfirmEventParams) => {
  showMapPicker.value = false;
  curMapVal.value = selectedOptions[0].value as string;
  checkedMapText.value = selectedOptions[0].label;
  editor?.setCurMap(curMapVal.value);
};
let mapPlugin: EditorPluginTempl | null = null;
const curMapVal = ref("0");
let curPoint = ref(["", ""]); // 当前点击的点位
let editor: Editor | null = null;

onMounted(() => {
  editor = new Editor("workspace", "canvas");
  editor.use(WorkspacePlugin);
  editor.use(MapPlugin);
  editor.use(DomPlugin);

  mapPlugin = editor.getPlugin("MapPlugin");
  // 监听点击地图点位变化、鼠标位置点位变化
  watch(mapPlugin.mapClickPosition, (val) => {
    curPoint.value = [val.x, val.y];
    $emits("update:position", curPoint.value);
  });
  editor.setCurMap(props.defaultMapKey);
  checkedMapText.value = mapItems.find((item) => item.value === props.defaultMapKey)?.label || "";
});
</script>

<style scoped lang="scss">
#workspace {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  overflow: hidden;
}
.canvas-box {
  position: relative;
}
.position {
  :deep(.van-cell__title) {
    flex: none;
    width: 60px;
  }
  :deep(.van-field) {
    padding-top: 0;
    padding-bottom: 0;
  }
}
</style>
