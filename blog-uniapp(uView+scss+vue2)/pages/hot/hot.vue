<template>
  <view class="hot-container">
    <!-- 保持纵横比缩放图片，使图片的长边能完全显示出来 -->
    <image class="logo" src="@/static/images/logo.png" mode="aspectFit" />
    <u-search
      class="search-bar"
      placeholder="请输入关键词"
      v-model="keyword"
      :show-action="false"
      bg-color="#fff"
      placeholder-color="#666"
      border-color="#c9c9c9"
      disabled
      @click="onSearchClick"
    ></u-search>
    <!-- 吸顶 tabs 栏 -->
    <u-sticky>
      <u-tabs
        ref="uTabs"
        :list="tabList"
        :current="currentTab"
        @change="onTabChange"
        :is-scroll="true"
        name="label"
        :bold="false"
      ></u-tabs>
    </u-sticky>
    <!-- 可滑动切换的热搜列表 -->
    <swiper
      :current="currentTab"
      :style="{ height: currentSwiperHeight + 'px' }"
      @animationfinish="onSwiperEnd"
      @change="onSwiperChange"
    >
      <swiper-item
        v-for="(swiperItem, swiperItemIndex) in tabList"
        :key="swiperItem.id"
        class="hot-list-wrapper"
      >
        <!-- 加载动画 -->
        <view class="loading-more" v-if="isLoading">
          <u-loading mode="flower" size="40"></u-loading>
          <text>正在加载...</text>
        </view>
        <!-- 列表项 -->
        <template v-else>
          <hot-list-item
            v-for="(item, index) in hotListArr[swiperItemIndex]"
            :key="item.id"
            :ranking="index + 1"
            :data="item"
            :class="'hot-list-item-' + swiperItemIndex"
            @click.native="onHotItemClick(item)"
          />
        </template>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      tabList: [{ name: '' }],
      hotList: [{ title: '' }],
      currentTab: 0,
      isLoading: true,
      currentSwiperHeight: 0,
      hotListArr: [],
      swiperHeightArr: [],
      currentPageScrollTop: 0,
    }
  },
  methods: {
    loadHotPage() {
      this.getTabList()
      this.getHotList()
    },
    onTabChange(index) {
      this.currentTab = index
      // 点击后为什么 swiper 为自动滑动
      // 因为点击后 this.currentTab 改变了，swiper 绑定的 current 也跟着改变了，而 swiper 设置了 current 对应的要显示的 swiper-item，所以会自动切换到对应标签下的列表
    },
    // 页面生命周期。监听页面滚动，参数为Object
    onPageScroll(res) {
      this.currentPageScrollTop = res.scrollTop
    },
    onSwiperChange(e) {
      if (this.currentPageScrollTop > 130) {
        uni.pageScrollTo({
          scrollTop: 138,
        })
      }
      // 解决官方 swiper 在 change 里改变 current 值无限左右抖动的 bug
      if (e.detail.source === 'touch') {
        this.currentTab = e.detail.current
      }
    },
    onSwiperEnd() {
      // 判断缓存是否有数据，不存在则重新获取数据
      if (!this.hotListArr[this.currentTab]) {
        this.getHotList()
        return
      }
      // 如果存在缓存数据，则存在 height 的缓存数据
      this.currentSwiperHeight = this.swiperHeightArr[this.currentTab]
    },
    async getTabList() {
      const { data } = await this.$u.api.getTabList()
      this.tabList = data.list
    },
    async getHotList() {
      if (!this.hotListArr[this.currentTab]) this.isLoading = true
      const { data } = await this.$u.api.getHotList('' + this.currentTab)
      this.hotList = data.list
      this.hotListArr[this.currentTab] = this.hotList

      this.isLoading = false
      setTimeout(async () => {
        this.currentSwiperHeight = await this.getCurrentSwiperHeight()
        this.swiperHeightArr[this.currentTab] = this.currentSwiperHeight
      }, 0)
    },
    // 需要获取列表各项总高度来设置 swiper 高度。不然高度太小，列表显示不全
    getCurrentSwiperHeight() {
      return new Promise((resolve, reject) => {
        let sum = 0
        const query = uni.createSelectorQuery().in(this)
        query
          .selectAll(`.hot-list-item-${this.currentTab}`)
          .boundingClientRect((res) => {
            res.forEach((item) => {
              sum += item.height
            })
            resolve(sum)
          })
          .exec()
      })
    },
    onHotItemClick(item) {
      // 不能写 '/subpkg/pages/search-blog/search-blog.vue'
      uni.navigateTo({ url: `/subpkg/pages/blog-detail/blog-detail?author=${item.user_name}&articleId=${item.id}` })
    },
    onSearchClick() {
      this.$u.route({
        url: 'subpkg/pages/blog-search/blog-search'
      })
    }
  },
  created() {
    this.loadHotPage()
  },
}
</script>

<style lang="scss" scoped>
.hot-container {
  .logo {
    width: 100%;
    height: 100px;
  }
  ::v-deep .u-search {
    margin: 0 10px !important;
  }
  .hot-list-wrapper {
    box-sizing: border-box;
    .loading-more {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
