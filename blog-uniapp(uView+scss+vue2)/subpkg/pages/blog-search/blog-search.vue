<template>
  <view class="blog-search">
    <view class="search-wrapper">
      <!-- 点击右侧控件触发的是custom事件，而不是search事件 -->
      <!-- clear 为清空 -->
      <u-search
        placeholder="Vue3 和 Vue2 都要学"
        v-model="searchVal"
        :show-action="showSearchBtn"
        @focus="onSearchFocus"
        @search="onSearchConfirm"
        @custom="onSearchConfirm"
        @clear="onSearchClear"
      ></u-search>
    </view>
    <!-- 热门搜索 -->
    <view class="hot-search-list-wrapper" v-if="showHotSearchList">
      <block v-for="(item, index) in hotSearchList" :key="item.id">
        <view class="hot-search-item" @click="onHotItemClick(item.label)">
          <view class="item-id">{{ index + 1 }}.</view>
          <view class="item-label">{{ item.label }}</view>
        </view>
      </block>
    </view>
    <!-- 搜索结果 -->
    <view class="search-result-list-wrapper" v-else>
      <block v-for="item in searchResultList" :key="item.id">
        <view class="result-item-box" @click="onResultItemClick(item)">
          <view class="title">
            <u-parse :html="item.title" :lazy-load="true"></u-parse>
          </view>
          <view class="desc">
            <u-parse :html="item.description" :lazy-load="true"></u-parse>
          </view>
          <view class="item-bottom">
            <view class="nickname">
              <text>{{ item.nickname }}</text>
            </view>
            <view class="createTime">
              <text>{{ item.create_time_str }}</text>
            </view>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    searchVal: '',
    showSearchBtn: false,
    showHotSearchList: true,
    hotSearchList: [],
    searchResultList: [],
  }),
  methods: {
    // 切换显示搜索按钮
    onSearchFocus() {
      this.showSearchBtn = true
    },
    // 获取热门排行文章
    async getHotSearchList() {
      const { data } = await this.$u.api.getHotSearchList()
      this.hotSearchList = data.list
    },
    // 获取搜索内容
    async getSearchResult(label) {
      const { data } = await this.$u.api.getSearchResult({ q: label, p: 1 })
      this.searchResultList = data.list
    },
    onHotItemClick(label) {
      this.searchVal = label
      this.onSearchConfirm()
    },
    onSearchConfirm() {
      if (this.searchVal) {
        this.getSearchResult(this.searchVal)
        this.showHotSearchList = false
      }
    },
    onSearchClear() {
      this.showHotSearchList = true
    },
    onResultItemClick(item) {
      this.$u.route({
        url: `/subpkg/pages/blog-detail/blog-detail?author=${item.user_name || item.author}&articleId=${item.id}`
      })
    }
  },
  created() {
    this.getHotSearchList()
  },
}
</script>

<style lang="scss" scoped>
.search-wrapper {
  padding: 20px;
}
.hot-search-list-wrapper {
  margin: 0 20px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  .hot-search-item {
    display: flex;
    padding: 10px;
    .item-id {
      margin-right: 5px;
      color: red;
    }
  }
}
.search-result-list-wrapper {
  .result-item-box {
    padding: 10px 20px;
    .title {
      font-weight: bold;
    }
    .desc {
      padding: 5px 0;
      font-size: 13px;
    }
    .item-bottom {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
    }
  }
}
::v-deep ._em {
  padding: 0 2px;
  color: red;
}
// ::v-deep .desc {
//   overflow: hidden;
//   text-overflow: ellipsis;
//   display: -webkit-box;
//   -webkit-box-orient: vertical;
//   -webkit-line-clamp: 2;
// }
</style>
