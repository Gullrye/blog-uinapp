<template>
  <view class="hot-video-container">
    <mescroll-body
      ref="mescrollRef"
      @init="mescrollInit"
      @down="downCallback"
      @up="upCallback"
    >
      <block v-for="(item, index) in videoList" :key="index">
        <hot-video-item :data="item" @click="onItemClick" />
      </block>
    </mescroll-body>
  </view>
</template>

<script>
import { getHotVideoList } from '@/api/video'
import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
import { mapMutations } from 'vuex'

export default {
  mixins: [MescrollMixin],
  data() {
    return {
      videoList: [],
      page: 1,
      size: 10,
      isInit: true,
      mescroll: null,
    }
  },
  created() {
    this.loadHotVideoList()
  },
  methods: {
    ...mapMutations('video', ['setVideoData']),
    onItemClick(data) {
      this.setVideoData(data)
      uni.navigateTo({ url: '/subpkg/pages/video-detail/video-detail' })
    },
    async loadHotVideoList() {
      const { data: res } = await getHotVideoList({
        page: this.page,
        size: this.size,
      })
      if (this.page === 1) {
        this.videoList = res.list
      } else {
        this.videoList = [...this.videoList, ...res.list]
      }
    },
    async mescrollInit() {
      await this.loadHotVideoList()
      this.isInit = false
      this.mescroll.endSuccess()
    },
    async downCallback() {
      if (this.isInit) return
      this.page = 1
      await this.loadHotVideoList()
      // 结束 上拉加载 && 下拉刷新
      this.mescroll.endSuccess()
    },
    async upCallback() {
      if (this.isInit) return
      this.page += 1
      await this.loadHotVideoList()
      // 结束 上拉加载 && 下拉刷新
      this.mescroll.endSuccess()
    },
  },
  mounted() {
    this.mescroll = this.$refs.mescrollRef.mescroll
  },
}
</script>

<style lang="scss" scoped>
.hot-video-container {
  background-color: $uni-bg-color-grey;
}
</style>
