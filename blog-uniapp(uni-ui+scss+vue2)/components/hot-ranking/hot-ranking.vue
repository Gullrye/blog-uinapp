<template>
  <view class="ranking">
    <image class="ranking-bg" :src="getRankingBg" />
		<!-- 前三名排名的数字为白色 -->
    <text class="ranking-text" :class="{'text-white': ranking <= 3}">{{ ranking }}</text>
  </view>
</template>

<script>
export default {
  name: 'hot-ranking',
  props: {
    ranking: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    getRankingBg() {
			// 前三名各不同的图
      if (this.ranking <= 3) {
        return require(`@/static/images/ranking-${this.ranking}.png`)
      }
			// 其他排名图片相同
      return require(`@/static/images/ranking-other.png`)
    },
  },
}
</script>

<style lang="scss" scoped>
.ranking {
  position: relative;
  width: 18px;
  height: 20px;
  text-align: center;
  .ranking-bg {
    width: 100%;
    height: 100%;
  }
  .ranking-text {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: $uni-font-size-sm;
    font-weight: bold;
    color: $uni-text-color;
    transform: translate(-55%, -55%);
  }
  .text-white {
    color: white;
  }
}
</style>
