<template>
  <view class="my-container">
    <view class="no-login-wrapper" v-if="!token">
      <view class="avatar-wrapper">
        <image src="@/static/images/default-avatar.png" mode="aspectFit" />
      </view>
      <text>登录后可同步数据</text>
      <u-button
        type="primary"
        :ripple="true"
        class="login-button"
        @click="onLoginBtnClick"
        >授权登录</u-button
      >
    </view>
    <view class="login-wrapper" v-else>
      <view class="no-login-wrapper">
        <view class="avatar-wrapper">
          <image :src="userInfo.avatarUrl" mode="aspectFit" />
        </view>
        <text>{{ userInfo.nickName }}</text>
        <u-button
          type="primary"
          :ripple="true"
          class="login-button"
          @click="onLogoutBtnClick"
          >退出登录</u-button
        >
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
      token: '',
    }
  },
  methods: {
    onLoginBtnClick() {
      uni.showLoading({
        title: '加载中',
      })
      let _self = this
      uni.getUserProfile({
        desc: '登录',
        async success(res) {
          _self.userInfo = res.userInfo
          // console.log(res)
          _self.token = await _self.$u.api.login(res)
          // console.log(_self.token)
        },
        fail() {
          uni.showToast({
            title: '授权已取消',
            icon: 'error',
            mask: true,
          })
        },
        complete() {
          // 隐藏loading
          uni.hideLoading()
        },
      })
    },
    onLogoutBtnClick() {
      this.token = ''
    }
  },
}
</script>

<style lang="scss" scoped>
.no-login-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .avatar-wrapper {
    margin: 100px 0 30px;
    image {
      width: 100px;
      height: 100px;
    }
  }
  .login-button {
    width: 200px;
    margin-top: 30px;
    background-color: skyblue;
    color: #fff;
  }
}
</style>
