<template>
  <n-form
    ref="formRef"
    :model="positionModel"
    :rules="positionRules"
    label-width="auto"
    size="small"
  >
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="12" label="标题" path="title">
        <n-input
          v-model:value="positionModel.title"
          placeholder="标题 如：34图抢钱啦??"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="描述" path="description">
        <n-input
          v-model:value="positionModel.description"
          placeholder="可以描述一些什么，也可以无视不填"
          :maxlength="50"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="地图" path="map">
        <n-select
          v-model:value="positionModel.map"
          placeholder="选择地图"
          value-field="_id"
          label-field="name"
          :options="mapStore.maps"
          :on-update:value="mapSelectHandle"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="鱼种" path="fish">
        <n-select
          v-model:value="positionModel.fish"
          placeholder="选择鱼种"
          value-field="_id"
          label-field="name"
          :options="fishSelectOptions"
          max-tag-count="responsive"
          multiple
        />
      </n-form-item-gi>
      <n-form-item-gi :span="24" path="tags" label="标签">
        <n-dynamic-tags v-model:value="positionModel.tags" />
      </n-form-item-gi>

      <n-form-item-gi :span="24" label="点位标记" path="position">
        <div class="w-full">
          <MapEditor
            :showMapSelector="false"
            :show-edit="!!positionModel.map"
            v-model:position="positionModel.position"
            ref="mapEditorRef"
          />
        </div>
      </n-form-item-gi>

      <n-form-item-gi :span="12" label="钓组" path="fishingGroup">
        <n-cascader
          v-model:value="positionModel.fishingGroup"
          placeholder="选择钓组"
          value-field="_id"
          label-field="dictName"
          :options="fishingGroupOptions"
          remote
          check-strategy="child"
          :on-load="fishingGroupLoadHandle"
          :on-update:value="fishingGroupCheckHandle"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="鱼饵" path="baits">
        <n-auto-complete
          v-model:value="positionModel.baits"
          placeholder="请输入鱼饵"
          @input="baitsInputHandle"
          :options="baitsOptions"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="卡米" path="distance">
        <n-input v-model:value="positionModel.distance" placeholder="如：35" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="引线" path="line">
        <n-input v-model:value="positionModel.line" placeholder="如：36.2" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="钩子" path="hook">
        <n-input v-model:value="positionModel.hook" placeholder="如：红毛巨2" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="上鱼时间" path="time">
        <n-time-picker
          style="width: 100%"
          v-model:value="positionModel.time"
          format="hh:mm"
          placeholder="选择上鱼时间"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="温度" path="temperature">
        <n-input v-model:value="positionModel.temperature" placeholder="请输入温度" />
      </n-form-item-gi>
      <n-form-item-gi :span="12">
        <!-- 空白 -->
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="鱼获截图" path="fishImages">
        <n-upload
          :max="3"
          accept=".jpg, .png, .jpeg"
          v-model:file-list="fishImageList"
          :default-file-list="fishImageList"
          list-type="image-card"
          :show-preview-button="true"
          multiple
          :custom-request="customRequest"
          :on-error="uplaodErrorHandle"
        />
      </n-form-item-gi>

      <n-form-item-gi :span="12" label="装备截图" path="equipmentImages">
        <n-upload
          :max="3"
          accept=".jpg, .png, .jpeg"
          v-model:file-list="equipmentImageList"
          :default-file-list="equipmentImageList"
          list-type="image-card"
          :show-preview-button="true"
          multiple
          :custom-request="customRequest"
          :on-error="uplaodErrorHandle"
        />
      </n-form-item-gi>
      <!-- 提交 -->
      <n-form-item-gi :span="24">
        <n-button
          class="w-2/3 mx-auto"
          type="primary"
          @click="submitHandle"
          :loading="submitLoading"
          >提交</n-button
        >
      </n-form-item-gi>
    </n-grid>
  </n-form>
</template>

<script setup lang="ts">
import MapEditor from "@pc/components/MapEditor/MapEditor.vue";
import { useMapStore } from "@/store/map";
import { getDicts, getMatchBaits } from "@/api/game";
import { uploadImg } from "@/api/common";
import { submitPoint } from "@/api/point";
import type { Point } from "@/types/point";
import { useRouter } from "vue-router";
const router = useRouter();
const submitLoading = ref(false);

const mapStore = useMapStore();
const formRef = ref(null);
const fishSelectOptions = ref([]);
const fishingGroupOptions = ref([]);
const mapEditorRef = ref(null);
// 图片上传列表
const fishImageList = ref([]);
const equipmentImageList = ref([]);

getDicts("FISHING_TYPE").then(({ data }) => {
  data = data.map((item) => {
    return {
      ...item,
      depth: 1,
      isLeaf: false,
    };
  });
  fishingGroupOptions.value = data;
});
const mapSelectHandle = (value) => {
  positionModel.value.map = value;
  const selectedMap = mapStore.maps.find((item) => item._id === value);
  fishSelectOptions.value = selectedMap.fish;
  positionModel.value.fish = [];
  // 切换地图编辑器地图
  if (mapEditorRef.value) {
    mapEditorRef.value.setMap(selectedMap.name);
  }
};
const fishingGroupLoadHandle = (option) => {
  return getDicts(option.dictValue).then(({ data }) => {
    option.children =
      data.map((item) => {
        return {
          ...item,
          depth: 2,
          isLeaf: true,
        };
      }) || [];
  });
};
const fishingGroupCheckHandle = (value) => {
  positionModel.value.fishingTackle = fishingGroupOptions.value.find((item) =>
    item.children?.find((child) => child._id === value)
  )._id;
  positionModel.value.fishingGroup = value;
};
const positionModel = ref<Point>({
  title: null,
  description: null,
  map: null,
  position: null,
  fish: null,
  tags: ["蹲星", "熟练度"],
  fishingGroup: null,
  fishingTackle: null,
  time: null,
  temperature: null,
  distance: null,
  line: null,
  hook: null,
  baits: null,
  canvasJson: null,
  equipmentImages: [],
  fishImages: [],
});
const positionRules = {
  title: {
    required: true,
    message: "请输入标题",
    trigger: "change",
  },
  description: {
    "max-length": 3,
    trigger: "change",
  },
  map: {
    required: true,
    message: "请选择地图",
    trigger: "change",
  },
  fish: [
    {
      type: "array",
      required: true,
      message: "请选择鱼种",
      trigger: "blur",
    },
  ],
  fishingGroup: {
    required: true,
    message: "请选择钓组",
    trigger: "change",
  },
  position: [
    {
      validator: (rule, value) => {
        if (!value || (!value[0] && !value[1])) {
          return new Error("请选择点位");
        }
        return true;
      },
      trigger: "blur",
    },
  ],
};

// 动态获取鱼饵
const baitsOptions = ref([]);
const baitsInputHandle = (val) => {
  if (val) {
    getMatchBaits(val).then(({ data }) => {
      baitsOptions.value = data.map((item) => {
        return {
          label: item.name,
          value: item.name,
        };
      });
    });
  }
};
// 图片上传
const customRequest = ({ file, data, onFinish, onError }: any) => {
  const formData = new FormData();
  formData.append("file", file.file);
  formData.append("type", "position");
  uploadImg(formData)
    .then(({ data }) => {
      file.status = "finished";
      file.url = data;
      onFinish();
    })
    .catch(() => {
      file.status = "failed";
      onError();
    });
};
const uplaodErrorHandle = () => {
  console.log("上传失败");
};
// 提交
const submitHandle = () => {
  formRef.value.validate().then((err) => {
    if (!err) {
      const params = {
        ...positionModel.value,
      };
      params.equipmentImages = equipmentImageList.value.map((item) => item.url);
      params.fishImages = fishImageList.value.map((item) => item.url);
      params.canvasJson = JSON.stringify(mapEditorRef.value?.getJson());
      submitLoading.value = true;
      submitPoint(params)
        .then(() => {
          submitLoading.value = false;
          window.$message.success("提交成功");
          router.push({
            path: "/recommend",
            replace: true,
          });
        })
        .catch(() => {
          submitLoading.value = false;
        });
    }
  });
};
</script>
