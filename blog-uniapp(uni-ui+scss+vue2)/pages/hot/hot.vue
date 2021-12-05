<template>
  <view class="hot-container">
    <image class="logo" src="@/static/images/logo.png" mode="aspectFit"></image>
    <view class="search-box" @click="handleSearchClick">
      <my-search placeholderText="uniapp 自定义组件"></my-search>
    </view>
    <!-- tabs -->
    <view class="tab-sticky">
      <my-tabs
        :tabData="tabData"
        :defaultIndex="currentIndex"
        :config="config"
        @tabClick="tabClick"
      ></my-tabs>
    </view>
    <!-- list -->
    <swiper
      class="swiper"
      :current="currentIndex"
      :style="{ height: currentSwiperHeight + 'px' }"
      @animationfinish="onSwiperEnd"
      @change="onSwiperChange"
    >
      <swiper-item
        class="swiper-item"
        v-for="(tabItem, tabIndex) in tabData"
        :key="tabIndex"
      >
        <view>
          <!-- 加载动画 -->
          <uni-load-more status="loading" v-if="isLoading"></uni-load-more>
          <template v-else>
            <hot-list-item
              :class="'hot-list-item-' + tabIndex"
              v-for="(item, index) in listData[tabIndex]"
              :key="index"
              :data="item"
              :ranking="index + 1"
              @click="onItemClick(item)"
            ></hot-list-item>
          </template>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import { getHotTabs, getHotListFromTabType } from 'api/hot'

export default {
  data() {
    return {
      isLoading: true,
      tabData: [],
      config: {},
      currentIndex: 0,
      listData: {},
      // 当前 swiper 的高度
      currentSwiperHeight: 0,
      // 以 index 为 key，对应的 swiper 的高度 为 val
      swiperHeightData: {},
      currentPageScrollTop: 0,
    }
  },
  methods: {
    onItemClick(item) {
      uni.navigateTo({ url: `/subpkg/pages/blog-detail/blog-detail?author=${item.user_name}&articleId=${item.id}` })
    },
    async loadHotTabs() {
      // uniapp 支持 async await
      const { data: res } = await getHotTabs()
      this.tabData = res.list
      // 获取列表数据
      this.getHotListFromTab()
    },
    async getHotListFromTab() {
      if (!this.listData[this.currentIndex]) this.isLoading = true
      const id = this.tabData[this.currentIndex].id
      const { data: res } = await getHotListFromTabType(id)

      this.listData[this.currentIndex] = res.list
      // 因为 this.$nextTick 存在一定的兼容性问题，所以更加推荐使用 setTimeout
      this.isLoading = false
      setTimeout(async () => {
        // 获取当前 swiper 的高度
        this.currentSwiperHeight = await this.getCurrentSwiperHeight()
        this.swiperHeightData[this.currentIndex] = this.currentSwiperHeight
      }, 0)
    },
    tabClick(index) {
      this.currentIndex = index
      // this.getHotListFromTab()
    },
    getCurrentSwiperHeight() {
      return new Promise((resolve, reject) => {
        let sum = 0
        const query = uni.createSelectorQuery().in(this)
        query
          .selectAll(`.hot-list-item-${this.currentIndex}`)
          .boundingClientRect((res) => {
            res.forEach((item) => {
              sum += item.height
            })
            resolve(sum)
          })
          .exec()
      })
    },
    // 解决卡顿问题
    onSwiperEnd() {
      // 判断缓存是否有数据，不存在则重新获取数据
      if (!this.listData[this.currentIndex]) {
        this.getHotListFromTab()
        return
      }
      // 未 return ，则证明存在缓存数据，即同时存在 height 的缓存数据
      this.currentSwiperHeight = this.swiperHeightData[this.currentIndex]
    },
    onSwiperChange(e) {
      // 吸顶效果
      if (this.currentPageScrollTop > 130) {
        uni.pageScrollTo({
          scrollTop: 130,
        })
      }
      // 解决官方 swiper 在 change 里改变 current 值无限左右抖动的 bug
      if (e.detail.source === 'touch') {
        this.currentIndex = e.detail.current
      }
    },
    handleSearchClick() {
      uni.navigateTo({ url: '/subpkg/pages/search-blog/search-blog' })
    },
  },
  onPageScroll(res) {
    this.currentPageScrollTop = res.scrollTop
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
.tab-sticky {
  position: sticky;
  position: -webkit-sticky;
  z-index: 999;
  /* #ifndef H5 */
  top: 0;
  /* #endif */
  /* #ifdef H5 */
  top: 44px;
  /* #endif */
}
</style>
