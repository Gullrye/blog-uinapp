<template>
  <view class="comment-container">
    <!-- 精简评论 -->
    <view class="comment-limt-container" v-if="!isShowAllComment">
      <view class="comment-title">精简评论</view>
      <block v-for="(item, index) in commentList.slice(0, 2)" :key="index">
        <article-comment-item :data="item.info" />
      </block>
      <view class="show-more" @click="onMoreClick">查看更多评论</view>
    </view>
    <!-- 全部评论 -->
    <view class="comment-all-container" v-else>
      <mescroll-body
        ref="mescrollRef"
        @init="mescrollInit"
        @up="upCallback"
        :down="{
          use: false,
        }"
        :up="{
          textNoMore: '-- 我也是有底线的！--',
        }"
      >
        <view class="comment-title">全部评论</view>
        <block v-for="item in commentList" :key="item.info.commentId">
          <article-comment-item :data="item.info" />
        </block>
      </mescroll-body>
    </view>
  </view>
</template>

<script>
import { getArticleCommentList } from '@/api/article'
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'

export default {
  mixins: [MescrollMixin],
  name: 'article-comment-list',
  props: {
    articleId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      page: 1,
      pageSize: 5,
      commentList: [],
      isShowAllComment: false,
      mescroll: null,
      totalSize: 0,
      isInit: true,
    }
  },
  mounted() {
    this.loadCommentList()
  },
  methods: {
    // 首次加载
    async mescrollInit(mescroll) {
      await this.loadCommentList()
      this.isInit = false
      this.mescroll = mescroll
      this.mescroll.endSuccess()
    },
    // 上拉加载更多
    async upCallback() {
      if (this.isInit) return
      this.page += 1
      await this.loadCommentList()
      this.mescroll.endSuccess()
      this.mescroll.endBySize(this.commentList.length, this.totalSize)
    },
    onMoreClick() {
      this.isShowAllComment = true
    },
    async loadCommentList() {
      // 记住加 await，别忘了！！！
      const { data: res } = await getArticleCommentList({
        // articleId: 106501992,
        articleId: this.articleId,
        page: this.page,
        size: this.pageSize,
      })
      this.totalSize = res.count
      if (this.page === 1) {
        this.commentList = res.list
      } else {
        this.commentList = [...this.commentList, ...res.list]
      }
    },
    addCommentList(data) {
      this.commentList.unshift(data)
    },
  },
}
</script>

<style lang="scss" scoped>
.comment-title {
  font-weight: bold;
  color: $uni-text-color;
  font-size: $uni-font-size-lg;
  margin: $uni-spacing-col-lg 0;
}
.comment-limt-container {
  .show-more {
    margin: $uni-spacing-col-lg;
    padding-bottom: 80px;
    text-align: center;
    color: $uni-text-color-more;
    font-size: $uni-font-size-base;
  }
}
.comment-container {
  padding-bottom: 30px;
}
</style>
