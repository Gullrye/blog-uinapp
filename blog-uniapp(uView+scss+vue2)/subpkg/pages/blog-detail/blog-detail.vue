<template>
  <view class="blog-detail-container">
    <view class="article-title">{{ data.title }}</view>
    <view class="author-bar">
      <view class="author-info-wrapper">
        <image class="avatar" :src="data.avatar"></image>
        <view class="info">
          <view class="author">{{ data.nickName }}</view>
          <view class="time">{{ data.date }}</view>
        </view>
      </view>
      <button>关注</button>
    </view>
    <u-parse :html="content" :lazy-load="true"></u-parse>
  </view>
</template>

<script>
export default {
  components: {},
  data: () => ({
    author: '',
    articleId: 0,
    content: '',
    data: {},
  }),
  methods: {
    async getArticleDetail() {
      const {
        data: { data: data },
      } = await this.$u.api.getArticleDetail({
        author: this.author,
        articleId: this.articleId,
      })
      this.data = data
      this.content = data.content
    },
  },
  onLoad(options) {
    this.author = options.author
    this.articleId = options.articleId
    this.getArticleDetail()
  }
}
</script>

<style lang="scss">
@import '~@/styles/article-detail.scss';

.blog-detail-container {
  padding: 0 10px;
  .article-title {
    font-size: 16px;
    font-weight: 700;
  }
  .author-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 5px;
    .author-info-wrapper {
      display: flex;
      align-items: center;
      .avatar {
        width: 40px;
        height: 40px;
        margin-right: 5px;
        border-radius: 50%;
      }
      .author {
        font-size: 14px;
        font-weight: 700;
      }
      .time {
        font-size: 12px;
        color: #666;
      }
    }
    button {
      height: 35px;
      margin: 0;
      font-size: 14px;
    }
  }
}
.interlayer ._img {
  display: block;
  margin: 0 auto;
}
</style>
