<template>
  <view class="search-blog-container">
    <my-search
      :placeholderText="defaultText"
      @confirm="onSearchConfirm"
      @cancel="onSearchCancel"
      @clear="onSearchClear"
      @focus="onSearchFocus"
      @blur="onSearchBlur"
      v-model="searchVal"
      :config="{
        icon: '@/static/images/search.png',
      }"
    ></my-search>
    <view class="search-hot-list-box card" v-if="showType === HOT_LIST">
      <search-hot-list @onSearch="onSearchConfirm" />
    </view>
    <view class="search-history-box" v-else-if="showType === SEARCH_HISTORY">
      <search-history
        @removeAllSearchData="removeAllSearchData"
        @removeSearchData="onRemoveSearchData"
        @onItemClick="onSearchConfirm"
      />
    </view>
    <view class="search-result-box" v-else>
      <search-result-list :queryStr="searchVal" ref="mescrollItem" />
    </view>
  </view>
</template>

<script>
import { getDefaultText } from '@/api/search.js'
import { mapMutations } from 'vuex'
import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js'

export default {
  name: 'search-blog',
  mixins: [MescrollCompMixin],
  data: () => ({
    isShowInput: true,
    defaultText: '搜索',
    HOT_LIST: '0',
    SEARCH_HISTORY: '1',
    SEARCH_RESULT: '2',
    showType: '0',
    searchVal: '',
  }),
  created() {
    this.loadDefaultText()
  },
  methods: {
    ...mapMutations('search', ['addSearchData']),
    async loadDefaultText() {
      const { data: res } = await getDefaultText()
      this.defaultText = res.defaultText
    },
    onSearchConfirm(val) {
      // 用户未输入文本，直接搜索时，使用 defaultText
      this.searchVal = val ? val : this.defaultText
      if (this.searchVal) {
        this.showType = this.SEARCH_RESULT
      }
      this.addSearchData(this.searchVal)
    },
    onSearchCancel() {
      console.log('cancel')
      this.showType = this.HOT_LIST
    },
    onSearchClear() {
      console.log('clear')
      this.showType = this.SEARCH_HISTORY
    },
    onSearchFocus() {
      console.log('focus')
      this.showType = this.SEARCH_HISTORY
    },
    onSearchBlur() {
      console.log('blur')
      // this.showType = this.SEARCH_HISTORY
    },
  }
}
</script>

<style lang="scss" scoped></style>
