<template>
  <!-- 顶部地图选择 -->
  <div class="flex justify-between items-center my-3">
    <div class="flex items-center" v-if="props.showMapSelector">
      <n-icon :component="Map" size="20" class="mr-4" />
      <n-select class="w-60 mr-2" placeholder="请选择地图" v-model:value="curMapVal" :options="mapItems" @update:value="mapSelectHandle" />
    </div>
    <div class="flex items-center">
      <n-input pair separator=":" :placeholder="['-', '-']" style="width: 200px" v-model:value="curPoint" @change="mapClickPositionChangeHandle" />
      <n-icon class="ml-3" :size="20" :component="MyLocationSharp"></n-icon>
    </div>
  </div>
  <!-- 地图编辑器 -->
  <div id="workspace" v-show="props.showEdit">
    <canvas id="canvas"></canvas>
    <!-- 点位展示 -->
    <n-input
      v-show="mapMode === 'position'"
      pair
      separator=":"
      :placeholder="['-', '-']"
      class="absolute top-2 right-2"
      style="width: 100px"
      size="small"
      readonly
      :value="curMousePoint"
    />
    <!-- 模式选择 -->
    <div class="absolute top-2 left-2 flex flex-col" v-if="$props.showMenu">
      <n-select class="w-28" size="small" v-model:value="mapMode" :options="mapModeOptions" @update:value="mapModeChangeHandle" />
      <div class="mt-3">
        <n-color-picker
          v-show="['arrow', 'paint', 'text'].indexOf(mapMode) !== -1"
          size="small"
          v-model:value="textColor"
          :modes="['hex']"
          :on-update:value="textColorUpdateHandle"
        />
        <n-button v-show="mapMode === 'text'" circle @click="editor?.addTextBox({ fill: textColor })" :render-icon="renderIcon(DocumentAdd)"></n-button>
        <n-input-number
          v-show="['arrow', 'paint'].indexOf(mapMode) !== -1"
          class="w-28"
          :min="0.2"
          size="small"
          :max="mapMode === 'arrow' ? 1.6 : 3"
          :default-value="1"
          :step="0.2"
          :on-update:value="storeWidthUpdateHandle"
        >
          <template #prefix>
            <n-icon :size="14" :component="DotCircleRegular" />
          </template>
        </n-input-number>
      </div>
    </div>
    <!-- 清除按钮 -->
    <n-button v-if="$props.showMenu" circle class="absolute bottom-12 left-6" @click="editor?.clear()" :render-icon="renderIcon(ClearOutlined)"></n-button>
    <!-- 保存按钮 -->
    <n-button v-if="$props.showMenu" circle class="absolute bottom-2 left-6" @click="editor?.download()" :render-icon="renderIcon(SaveAltFilled)"></n-button>
    <!-- 放大缩小图标组 -->
    <n-button-group class="absolute bottom-2 right-2">
      <n-button size="small" @click="editor?.big()" :render-icon="renderIcon(ZoomInOutlined)"></n-button>
      <n-button size="small" @click="editor?.small()" :render-icon="renderIcon(ZoomOutOutlined)"></n-button>
      <n-button size="small" @click="editor?.one()" :render-icon="renderIcon(ZoomInMapFilled)"></n-button>
      <n-button size="small" @click="editor?.auto()" :render-icon="renderIcon(ZoomOutMapFilled)"></n-button>
    </n-button-group>
  </div>
</template>

<script setup name="mapEditor" lang="ts">
import { useThemeVars } from "naive-ui";
import { Map } from "@vicons/ionicons5";
import { ZoomInOutlined, ZoomOutOutlined, ZoomInMapFilled, ZoomOutMapFilled, SaveAltFilled, MyLocationSharp } from "@vicons/material";
import { ClearOutlined } from "@vicons/antd";
import { DocumentAdd } from "@vicons/carbon";
import { DotCircleRegular } from "@vicons/fa";
import { mapItems } from "@/config/map";
import { ref } from "vue";
import Editor from "@/common/MapEditor/core";
import WorkspacePlugin from "@/common/MapEditor/plugins/WorkspacePlugin";
import MapPlugin from "@/common/MapEditor/plugins/MapPlugin";
import DrawPlugin from "@/common/MapEditor/plugins/DrawPlugin";
import DomPlugin from "@/common/MapEditor/plugins/DomPlugin";
import { renderIcon } from "@pc/utils/render";
import { fabric } from "fabric";

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
  showMenu: {
    type: Boolean,
    default: true,
  },
  showEdit: {
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
  getJson: () => {
    return editor?.exportObjects();
  },
  setJson: (val: any) => {
    editor?.importObjects(val);
  },
  setPoint: (point: string[]) => {
    mapClickPositionChangeHandle(point);
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

const themeVars = useThemeVars();

let mapPlugin: EditorPluginTempl | null = null;
const curMapVal = ref("0");
let curPoint = ref<[string, string]>(["", ""]); // 当前点击的点位
let curMousePoint = ref<[string, string]>(["", ""]); // 当前鼠标位置的点位
let editor: Editor | null = null;

const mapModeOptions = [
  { label: "点位查询", value: "position" },
  { label: "标记箭头", value: "arrow" },
  { label: "标记涂鸦", value: "paint" },
  { label: "文本编辑", value: "text" },
];
const mapMode = ref("position");
const textColor = ref("#000000");
const textColorUpdateHandle = (val: string) => {
  textColor.value = val;
  editor?.setDrawColor(val);
};
// 画笔或者箭头宽度
const storeWidthUpdateHandle = (val: number) => {
  editor?.setDrawStrokeWidth(val);
};
// 切换地图模式
const mapModeChangeHandle = (val: string) => {
  switch (val) {
    case "position":
      editor?.setMapFindSwitch(true);
      editor?.setAllowDrag(true);
      editor?.setDrawMode("base");
      break;
    case "arrow":
      editor?.setDrawMode("arrow");
      editor?.setMapFindSwitch(false);
      editor?.setAllowDrag(false);
      break;
    case "paint":
      editor?.setDrawMode("draw");
      editor?.setMapFindSwitch(false);
      editor?.setAllowDrag(false);
      break;
    case "text":
      editor?.setDrawMode("base");
      editor?.setMapFindSwitch(false);
      editor?.setAllowDrag(false);
      break;
  }
};
// 手动输入点位回显
const mapClickPositionChangeHandle = (val: string[]) => {
  editor?.setMapClickPosition({ x: Number(val[0]), y: Number(val[1]) });
};

onMounted(() => {
  editor = new Editor("workspace", "canvas");
  editor.use(WorkspacePlugin);
  editor.use(MapPlugin);
  editor.use(DrawPlugin);
  editor.use(DomPlugin);

  mapPlugin = editor.getPlugin("MapPlugin");
  // 监听点击地图点位变化、鼠标位置点位变化
  watch(mapPlugin.mapMousePosition, (val) => {
    curMousePoint.value = [val.x, val.y];
  });
  watch(mapPlugin.mapClickPosition, (val) => {
    curPoint.value = [val.x, val.y];
    $emits("update:position", curPoint.value);
  });

  editor.setCurMap(props.defaultMapKey);
});

// 切换地图
const mapSelectHandle = (val: string) => {
  // editor.addMarkersByPosition([{x:83, y:145}, {x:40, y:133}, {x:132, y:147}])
  editor.setCurMap(val);
};
</script>

<style scoped lang="scss">
#workspace {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 60%;
  background-color: v-bind("themeVars.bodyColor");
  overflow: hidden;
}
.canvas-box {
  position: relative;
}
</style>
