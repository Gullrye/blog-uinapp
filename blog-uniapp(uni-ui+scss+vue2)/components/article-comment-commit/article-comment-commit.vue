// 发表评论的弹出层组件
<template>
  <view class="comment-container">
    <uni-easyinput
      v-model="value"
      type="textarea"
      placeholder="填写评论..."
      :maxlength="50"
      :inputBorder="false"
    />
    <button
      class="commit"
      type="primary"
      :disabled="!value"
      size="mini"
      @click="onBtnClick"
    >
      发送
    </button>
  </view>
</template>

<script>
import { userComment } from '@/api/user'

export default {
  name: 'article-comment-commit',
  props: {
    articleId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      value: '',
    }
  },
  methods: {
    async onBtnClick() {
      uni.showLoading({
        title: '加载中',
      })
      const { data: res } = await userComment({
        articleId: this.articleId,
        content: this.value,
      })
      uni.showToast({
        title: '发表成功',
        icon: 'success',
        mask: true,
      })
      this.$emit('success', res)
    },
  },
}
</script>

<style lang="scss" scoped>
.comment-container {
  position: relative;
  padding: $uni-spacing-row-base;
  text-align: right;
  background-color: $uni-bg-color;
}
</style>
