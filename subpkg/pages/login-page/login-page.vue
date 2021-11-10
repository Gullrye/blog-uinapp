<template>
  <div class="login-page">
    <my-login @onLoginSuccess="onLoginSuccess" />
  </div>
</template>

<script>
export default {
  name: 'login-page',
  components: {},
  data: () => ({}),
  computed: {},
  methods: {
    onLoginSuccess() {
      // 登录成功后返回上一个页面
      // 返回上一级页面
      uni.navigateBack({ delta: 1 })
    }
  }
}
</script>

<style lang="scss" scoped></style>
