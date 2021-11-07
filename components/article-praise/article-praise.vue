// 点赞
<template>
  <view class="praise-box">
    <image src="/static/images/un-praise.png" class="img"/>
    <text class="txt">点赞</text>
  </view>
</template>

<script>
export default {
  name: 'article-praise',
  data() {
    return {}
  },
}
</script>

<style lang="scss">
.praise-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  .img {
    width: $uni-img-size-sm;
    height: $uni-img-size-sm;
    color: $uni-text-color;
  }
  .txt {
    font-size: $uni-font-size-sm;
    color: $uni-text-color;
  }
}
</style>
