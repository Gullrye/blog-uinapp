<template>
  <view class="operate-container">
    <view class="comment-box">
      <my-search placeholderText="评论..."
			:isShowInput='false'
			:config="{
          height: 28,
          backgroundColor: '#eeedf4',
          icon: '/static/images/input-icon.png',
          textColor: '#a6a5ab',
          border: 'none'
        }"
			 />
    </view>
    <view class="options-box">
      <article-praise />
    </view>
    <view class="options-box">
      <article-collect />
    </view>
  </view>
</template>

<script>
export default {
  name: 'article-operate',
  data() {
    return {}
  },
}
</script>

<style lang='scss' scoped> 
.operate-container {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid $uni-bg-color-grey;
  background-color: $uni-bg-color;
  .comment-box {
    flex-grow: 2;
  }
  .options-box {
    flex-grow: 1;
  }
}
</style>
