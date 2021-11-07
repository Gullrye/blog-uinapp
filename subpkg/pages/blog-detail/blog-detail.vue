<template>
  <page-meta root-font-size="14px">
    <view class="detail-container">
      <!-- 文章内容区域 -->
      <block v-if="articleData">
        <!-- 标题 -->
        <view class="title">{{ articleData.articleTitle }}</view>
        <view class="detail-info">
          <view class="detail-left">
            <view class="avatar-box">
              <!-- 头像 -->
              <image class="avatar" :src="articleData.avatar"></image>
            </view>
            <view class="author-box">
              <!-- 作者 -->
              <text class="author">{{ articleData.nickName }}</text>
              <!-- 发布时间 -->
              <text class="release-time">{{ articleData.date }}</text>
            </view>
          </view>
          <view class="detail-right">
            <!-- 关注按钮 -->
            <button class="follow" size="mini">关注</button>
          </view>
        </view>
        <!-- 文章内容 -->
        <mp-html
          class="markdown_views"
          :content="articleData.content"
          scroll-table
        />
      </block>
    </view>
    <view class="comment-box">
      <article-comment-list ref="mescrollItem" :articleId="articleId"/>
    </view>
    <article-operate class="article-operate" />
  </page-meta>
</template>

<script>
import { getArticleDetail } from '@/api/article'
import mpHtml from '@/uni_modules/mp-html/components/mp-html/mp-html'
import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js'

export default {
  mixins: [MescrollCompMixin],
  components: {
    mpHtml,
  },
  data: () => ({
    author: '',
    articleId: '',
    articleData: null
  }),
  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.author = options.author
    this.articleId = options.articleId
    this.loadArticleDetail()
  },
  methods: {
    async loadArticleDetail() {
      uni.showLoading({
        title: '加载中',
        mask: true,
      })
      const { data: res } = await getArticleDetail({
        author: this.author,
        articleId: this.articleId,
      })
      this.articleData = res.data
      // console.log(this.articleData.content)
      uni.hideLoading()
    },
  },
}
</script>

<style lang="scss">
// 文章详情内容样式使用了 typora 中的 vue theme
@import '~@/style/article-detail.scss';

.detail-container {
  padding: $uni-spacing-col-base $uni-spacing-row-base;
  .title {
    font-size: $uni-font-size-title;
    color: $uni-text-color;
    font-weight: bold;
  }
  .detail-info {
    padding: $uni-spacing-col-base 0;
    display: flex;
    justify-content: space-between;
    .detail-left {
      display: flex;
      .author-box {
        margin-left: $uni-spacing-row-base;
        display: flex;
        flex-direction: column;
        .author {
          font-size: $uni-font-size-base;
          font-weight: bolder;
          color: $uni-color-title;
        }
        .release-time {
          font-size: $uni-font-size-sm;
          color: $uni-text-color-grey;
        }
      }
    }
    .detail-right {
      display: flex;
      align-items: center;
    }
  }
}
</style>
