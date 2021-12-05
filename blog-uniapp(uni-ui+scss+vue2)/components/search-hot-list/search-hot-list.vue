<template>
  <view class="search-hot-list-container">
    <view class="search-hot-title">IT 热搜榜 风云天下</view>
    <block v-for="(item, index) in hotList" :key="item.id">
      <view class="search-hot-item" @click="handleItemSearch(item, index)">
        <hot-ranking :ranking="index + 1" />
        <text class="title line-camp">{{ item.label }}</text>
        <image
          v-if="index <= 2"
          src="/static/images/hot-icon.png"
					class="search-hot-icon"
          mode="scaleToFill"
        />
      </view>
    </block>
  </view>
</template>

<script>
import { getSearchHotList } from '@/api/search.js'

export default {
  name: 'search-hot-list',
  data() {
    return {
      hotList: [],
    }
  },
  created() {
    this.getSearchHotList()
  },
  methods: {
    async getSearchHotList() {
      const { data: res } = await getSearchHotList()
      this.hotList = res.list
    },
		handleItemSearch(item) {
			this.$emit('onSearch', item.label)
		}
  },
}
</script>

<style lang="scss">
.search-hot-list-container {
  .search-hot-title {
    font-weight: bold;
    font-size: $uni-font-size-base;
    color: red;
    padding: 0 12px $uni-spacing-col-lg 12px;
    margin: 0 -12px $uni-spacing-col-lg -12px;
    box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1);
  }
  .search-hot-item {
    display: flex;
    align-items: center;
    padding: $uni-spacing-col-lg 0;
    .title {
      color: $uni-text-color;
      font-size: $uni-font-size-base;
      margin: 0 $uni-spacing-row-base;
    }
    .search-hot-icon {
      width: 14px;
      height: 14px;
    }
  }
}
</style>
