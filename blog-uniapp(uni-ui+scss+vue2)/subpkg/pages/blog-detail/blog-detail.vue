<template>
  <!-- #ifndef H5 -->
  <page-meta root-font-size="14px">
    <!-- #endif -->
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
            <button
              class="follow"
              size="mini"
              @click="onFollowClick"
              :type="articleData.isFollow ? 'primary' : 'default'"
              :loading="isFollowLoading"
            >
              {{ articleData.isFollow ? '已关注' : '关注' }}
            </button>
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
      <article-comment-list
        ref="mescrollItem"
        :articleId="articleId"
        :newComment="newComment"
      />
    </view>
    <article-operate class="article-operate" @commitClick="onCommit" />
    <uni-popup ref="popup" type="center" @change="onCommitPopupChange">
      <article-comment-commit
        v-if="isShowCommit"
        :articleId="articleId"
        @success="onSendSuccess"
      />
    </uni-popup>
    <!-- #ifndef H5 -->
  </page-meta>
  <!-- #endif -->
</template>

<script>
import { getArticleDetail } from '@/api/article'
import { userFollow } from '@/api/user'
import mpHtml from '@/uni_modules/mp-html/components/mp-html/mp-html'
import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js'
import { mapActions } from 'vuex'

export default {
  name: 'blog-detail',
  mixins: [MescrollCompMixin],
  components: {
    mpHtml,
  },
  data: () => ({
    author: '',
    articleId: '',
    articleData: null,
    isFollowLoading: false,
    // popup 的显示状态
    isShowCommit: false,
  }),
  // 页面周期函数--监听页面加载
  onLoad(options) {
    this.author = options.author
    this.articleId = options.articleId
    this.loadArticleDetail()
  },
  methods: {
    ...mapActions('user', ['isLogin']),
    onSendSuccess(data) {
      // 关闭弹出层
      this.$refs.popup.close()
      this.isShowCommit = false
      this.$refs.mescrollItem.addCommentList(data)
    },
    onCommit() {
      this.$refs.popup.open('top')
    },
    onCommitPopupChange(e) {
      // 修改对应的标记，当 popup 关闭时，为了动画平顺，进行延迟处理
      if (e.show) {
        this.isShowCommit = e.show
      } else {
        setTimeout(() => {
          this.isShowCommit = e.show
        }, 200)
      }
    },
    async onFollowClick() {
      const isLogin = await this.isLogin()
      if (!isLogin) {
        return
      }
      this.isFollowLoading = true
      const { data: res } = await userFollow({
        author: this.author,
        // 服务端
        isFollow: !this.articleData.isFollow,
      })
      // 每点击一次关注按钮，进行 true 和 false 的切换
      this.articleData.isFollow = !this.articleData.isFollow
      this.isFollowLoading = false
    },
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
