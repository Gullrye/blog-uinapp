<template>
  <view class="item-container">
    <view class="item-box">
      <!-- 图标 -->
      <view class="ranking-icon-wrapper">
        <image :src="getRankingBg" mode="aspectFit" />
        <text
          class="ranking-text"
          :style="{ color: ranking <= 3 ? '#fff' : '#000' }"
          >{{ ranking }}</text
        >
      </view>
      <!-- 列表内容 -->
      <view class="main">
        <view class="title line-clamp-2">{{ data.title }}</view>
        <view class="desc line-clamp-2">{{ data.desc }}</view>
        <view class="bottom-box">
          <view class="author">{{ data.nickname }}</view>
          <view class="hot-box">
            <image class="hot-icon" src="@/static/images/hot-icon.png" />
            <text class="hot-text">{{ data.views }} 热度</text>
          </view>
        </view>
      </view></view
    >
  </view>
</template>

<script>
export default {
  name: 'hot-list-item',
  props: {
    data: {
      type: Object,
      required: true,
    },
    ranking: {
      type: Number,
      required: true,
    },
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
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.item-container {
  padding: 5px 10px;
  .item-box {
    box-sizing: border-box;
    display: flex;
    padding: 15px 0;
    border-radius: 8px;
    box-shadow: 1px 0 5px 0 rgba(0, 0, 0, 0.1);
    .ranking-icon-wrapper {
      position: relative;
			width: 18px;
			height: 20px;
			margin: 0 10px;
      image {
        width: 18px;
        height: 20px;
      }
      .ranking-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 12px;
      }
    }
    .main {
			width: 100%;
      padding-right: 5px;
      .title {
				width: 100%;
        font-size: 16px;
        font-weight: 700;
        color: #000;
      }
      .desc {
        font-size: 14px;
        color: #333;
      }
      .bottom-box {
        display: flex;
        justify-content: space-between;
				padding-top: 10px;
        .author {
          font-size: 12px;
          color: #999;
        }
        .hot-box {
          display: flex;
          .hot-icon {
            width: 18px;
            height: 18px;
          }
          .hot-text {
            flex: 1;
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
}
.line-clamp-2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
	word-break: break-word;
}
</style>
