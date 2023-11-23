<template>
  <n-card :bordered="false" class="rounded" title="个人资料">
    <n-row>
      <n-col :span="15">
        <n-form
          ref="formRef"
          :model="userInfoModel"
          label-placement="left"
          label-width="auto"
          require-mark-placement="right-hanging"
          :style="{
            maxWidth: '640px',
          }"
        >
          <n-form-item label="手机号" path="mobile">
            <n-input :value="userStore.userInfo?.mobile" disabled />
          </n-form-item>
          <n-form-item label="昵称" path="nickname">
            <n-input v-model:value="userInfoModel.nickname" :maxlength="12" placeholder="请输入昵称" />
          </n-form-item>
          <n-form-item label="个性签名" path="description">
            <n-input
              v-model:value="userInfoModel.description"
              placeholder="可以描述一些什么，也可以无视不填"
              type="textarea"
              :autosize="{
                minRows: 3,
                maxRows: 5,
              }"
            />
          </n-form-item>
        </n-form>
      </n-col>
      <n-col :span="9">
        <div class="w-full flex flex-col items-center">
          <n-avatar class="rounded-2xl" :size="128" :src="userInfoModel.avatar" />
          <n-upload
            type="image"
            class="flex items-center justify-center mt-4"
            :custom-request="uploadImgHandle"
            accept="image/*"
            :default-file-list="[]"
            :max="1"
            v-model:file-list="imageFileList"
            :show-file-list="false"
          >
            <n-button :loading="uploadImgLoading">点击上传</n-button>
          </n-upload>
        </div>
      </n-col>
      <n-col :span="24" class="mt-5 flex justify-center">
        <n-button class="w-1/5" type="primary" @click="submitHandle" :loading="submitLoading">修改</n-button>
      </n-col>
    </n-row>
  </n-card>
</template>
<script setup lang="ts" name="userInfo">
import { useUserStore } from "@/store/user";
import { updateUser } from "@/api/user";
import { uploadImg } from "@/api/common";
import { useDialog } from "naive-ui";

const dialog = useDialog();

const userStore = useUserStore();

const submitLoading = ref(false);

const userInfoModel = ref({
  nickname: "",
  avatar: "",
  description: "",
});

for (const key in userInfoModel.value) {
  userInfoModel.value[key] = userStore.userInfo[key];
}

const submitHandle = () => {
  // 二次确认
  dialog.warning({
    showIcon: false,
    title: "修改个人资料",
    content: "是否确认修改个人资料",
    positiveText: "确认",
    negativeText: "取消",
    onPositiveClick: () => {
      submitLoading.value = true;
      updateUser(userInfoModel.value)
        .then(({ data }) => {
          submitLoading.value = false;
          userStore.setUserInfo(data);
        })
        .catch(() => {
          submitLoading.value = false;
        });
    },
  });
};

const imageFileList = ref([]);
const uploadImgLoading = ref(false);
const uploadImgHandle = ({ file, data, onFinish, onError }: any) => {
  uploadImgLoading.value = true;
  const formData = new FormData();
  formData.append("file", file.file);
  formData.append("type", "avatar");
  uploadImg(formData)
    .then(({ data }) => {
      file.status = "finished";
      file.url = data;
      userInfoModel.value.avatar = data;
      onFinish();
      imageFileList.value = [];
      uploadImgLoading.value = false;
    })
    .catch(() => {
      file.status = "failed";
      onError();
      imageFileList.value = [];
      uploadImgLoading.value = false;
    });
};
</script>
<style scoped lang="scss"></style>
