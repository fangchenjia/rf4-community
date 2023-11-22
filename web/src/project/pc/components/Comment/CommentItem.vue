<template>
  <n-thing content-indented>
    <!-- 头像 -->
    <template #avatar>
      <n-avatar round size="small" :src="$props.comment.user?.avatar"> </n-avatar>
    </template>
    <template #header>
      <!-- 昵称 -->
      <span class="text-xs">{{ $props.comment.user?.nickname }}</span>
      <!-- 回复人 -->
      <template v-if="$props.comment.toUser && $props.comment.toUser._id !== $props.comment.user?._id">
        <span class="mx-2 text-sm font-normal">回复</span> <span class="text-sm text-blue-500">@{{ $props.comment.toUser?.nickname }}</span>
      </template>
      <!-- 内容 -->
      <span v-if="$props.comment.parent" class="text-sm font-normal"> : {{ $props.comment.content }} </span>
    </template>
    <!-- 内容 -->
    <div v-if="!$props.comment.parent">{{ $props.comment.content }}</div>
    <!-- 时间以及点赞 -->
    <div class="text-gray-500 mt-2 flex items-center">
      <span class="mr-2">
        {{ formatTimeAgo($props.comment.createdAt) }}
      </span>
      <div class="flex items-center">
        <n-icon class="mr-2" :size="14" :color="$props.comment.likes.includes(userStore.userInfo._id) ? themeVars.primaryColor : ''" :component="ThumbUpAltOutlined"></n-icon>
        <span>{{ $props.comment.likes.length }}</span>
      </div>
      <n-button text class="ml-2" type="primary" @click="$emits('reply', $props.comment)"> 回复 </n-button>
    </div>
    <template #footer>
      <slot name="childrenComment"></slot>
    </template>
  </n-thing>
</template>
<script setup lang="ts" name="commentItem">
import { formatTimeAgo } from "@/utils";
import { useUserStore } from "@/store/user";
import { ThumbUpAltOutlined } from "@vicons/material";
import { useThemeVars } from "naive-ui";
import type { PositionCommentItem } from "@/types/comment";

const $emits = defineEmits(["reply"]);
const userStore = useUserStore();
const themeVars = useThemeVars();
const $props = defineProps({
  comment: {
    type: Object as PropType<PositionCommentItem>,
    default: () => {},
  },
});
</script>
