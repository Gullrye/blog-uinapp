<template>
  <view class="hot-container">
    <image class="logo" src="@/static/images/logo.png" mode="aspectFit"></image>
    <view class="search-box">
      <my-search placeholderText="uniapp 自定义组件"></my-search>
    </view>
    <my-tabs v-bind:tabData="tabData" :defaultIndex="0"></my-tabs>
  </view>
</template>

<script>
import { getHotTabs } from '../../api/hot'

export default {
  data() {
    return {
      tabData: [],
    }
  },
  methods: {
    async loadHotTabs() {
      const res = await getHotTabs()
      // console.log(res)
      const { data } = res
      this.tabData = data.list
      console.log(this.tabData)
    }
  },
  created() {
    this.loadHotTabs()
  },
}
</script>

<style lang="scss" scoped>
.hot-container {
  background-color: $uni-bg-color;
  .logo {
    width: 100%;
    height: 80px;
  }
  .search-box {
    padding: 0 15px;
    margin-bottom: $uni-spacing-col-base;
  }
}
</style>
