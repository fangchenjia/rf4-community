<template>
  <n-card :bordered="false">
    <CommentInput class="mb-6" v-model:value="comment" :loading="commentBtnLoading" @submit="submitHandle" />
    <CommentItem v-for="item in commentList" :key="item._id" :comment="item" @reply="replyHandle" @delete="deleteHandle" @like="likeHandle">
      <template #childrenComment>
        <CommentInput
          v-if="curReplyComment._id === item._id"
          class="mb-6"
          v-model:value="secondLevelComment"
          :loading="secondLevelBtnLoading"
          @submit="submitSecondLevelHandle(item)"
        />
        <CommentItem v-for="child in item.children" :key="child._id" :comment="child" @reply="replyHandle" @delete="deleteHandle" @like="likeHandle">
          <template #childrenComment>
            <CommentInput
              v-if="curReplyComment._id === child._id"
              class="mb-6"
              v-model:value="secondLevelComment"
              :loading="secondLevelBtnLoading"
              @submit="submitSecondLevelHandle(item)"
            />
          </template>
        </CommentItem>
      </template>
    </CommentItem>
  </n-card>
</template>

<script setup lang="ts" name="positionComment">
import CommentItem from "@pc/components/Comment/CommentItem.vue";
import CommentInput from "@pc/components/Comment/CommentInput.vue";
import { CreatePositionComment, QueryPositionComment, RemovePositionComment, LikePositionComment } from "@/api/comment";
import type { PositionCommentItem } from "@/types/comment";
import { useDialog } from "naive-ui";

const dialog = useDialog();
const $props = defineProps({
  positionId: {
    type: String,
    required: true,
  },
});

const commentList = ref([]);

const getCommentList = () => {
  QueryPositionComment($props.positionId).then((res: any) => {
    commentList.value = res.data;
  });
};
getCommentList();

// 一级评论提交
const comment = ref("");
const commentBtnLoading = ref(false);
const submitHandle = () => {
  commentBtnLoading.value = true;
  CreatePositionComment({
    position: $props.positionId,
    content: comment.value,
  })
    .then(() => {
      comment.value = "";
      getCommentList();
    })
    .finally(() => {
      commentBtnLoading.value = false;
    });
};

// 二级评论回复框展示
const curReplyComment = ref<PositionCommentItem>({} as PositionCommentItem);
const secondLevelComment = ref("");
const secondLevelBtnLoading = ref(false);
const submitSecondLevelHandle = (firstLevelComment) => {
  secondLevelBtnLoading.value = true;
  CreatePositionComment({
    parent: firstLevelComment._id,
    content: secondLevelComment.value,
    toUser: curReplyComment.value.user._id,
  })
    .then(() => {
      secondLevelComment.value = "";
      curReplyComment.value = {} as PositionCommentItem;
      getCommentList();
    })
    .finally(() => {
      secondLevelBtnLoading.value = false;
    });
};
const replyHandle = (item) => {
  if (curReplyComment.value._id === item._id) {
    curReplyComment.value = {} as PositionCommentItem;
    return;
  }
  curReplyComment.value = item;
  secondLevelComment.value = "";
};

// 删除评论
const deleteHandle = (item) => {
  // 二次确认
  dialog.error({
    title: "警告",
    content: "确定要删除该评论吗？",
    positiveText: "确定",
    negativeText: "取消",
    onPositiveClick: () => {
      RemovePositionComment(item._id).then(() => {
        getCommentList();
      });
    },
  });
};

// 点赞评论
const likeHandle = (item) => {
  LikePositionComment(item._id).then(() => {
    getCommentList();
  });
};

// 暴露给父组件
defineExpose({
  commentList,
});
</script>
