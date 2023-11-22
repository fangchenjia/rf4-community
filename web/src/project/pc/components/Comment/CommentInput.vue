<template>
  <div class="flex items-center">
    <div>
      <n-avatar v-if="userStore.isLogin" size="large" round :src="userStore.userInfo?.avatar" class="mr-2"> </n-avatar>
    </div>
    <n-input type="textarea" :rows="1" v-model:value="value" @input="$emits('update:value', value)" size="large" :placeholder="$props.placeholder"> </n-input>
    <n-button type="primary" class="ml-2" size="large" @click="$emits('submit')" :loading="$props.loading"> 发布 </n-button>
  </div>
</template>
<script setup lang="ts" name="commentInput">
import { useUserStore } from "@/store/user";
import { ref } from "vue";

const $emits = defineEmits(["update:value", "submit"]);

const userStore = useUserStore();
const $props = defineProps({
  value: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "说点什么",
  },
});
const value = ref($props.value);

watch(
  () => $props.value,
  (newValue) => {
    value.value = newValue;
  }
);
</script>
