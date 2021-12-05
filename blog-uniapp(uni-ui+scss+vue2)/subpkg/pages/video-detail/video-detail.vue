<template>
  <view class="video-detail-container">
    <view class="video-box">
      <video
        class="video"
        :src="videoData.play_url"
        :danmu-list="danmuList"
        enable-danmu
        danmu-btn
        controls
      ></video>
      <hot-video-info :data="videoData" />
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import { getVideoDanmuList } from '@/api/video'

export default {
  name: 'video-detail',
  data() {
    return {
      danmuList: []
    }
  },
  methods: {
    async loadVideoDanmuList() {
      const { data: res } = await getVideoDanmuList({
        videoId: this.videoData.videoId
      })
      this.danmuList = res.list
    }
  },
  created() {
    this.loadVideoDanmuList()
  },
  computed: {
    ...mapState('video', ['videoData']),
  },
}
</script>

<style lang="scss" scoped>
.video-detail-container {
  .video-box {
    position: sticky;
    top: 0;
    background-color: $uni-bg-color;
    z-index: 9;
    .video {
      width: 100%;
      height: 230px;
    }
  }
}
</style>
