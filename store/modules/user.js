import { login } from '@/api/user'
const STORAGE_KEY = 'user-info'
const TOKEN_KEY = 'token'

export default {
  namespaced: true,
  state() {
    return {
      token: uni.getStorageSync(TOKEN_KEY) || '',
      userInfo: uni.getStorageSync(STORAGE_KEY) || {},
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      uni.setStorage({
        key: TOKEN_KEY,
        data: state.token,
      })
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      uni.setStorage({
        key: STORAGE_KEY,
        data: state.userInfo,
      })
    },
    removeToken() {
      // this 为 Store
      this.commit('user/setToken', '')
    },
    removeUserInfo() {
      this.commit('user/setUserInfo', {})
    },
  },
  actions: {
    async login({ commit }, userProfile) {
      const rawData = userProfile.userInfo
      // 调用登录接口
      const { data: res } = await login({
        signature: userProfile.signature,
        iv: userProfile.iv,
        nickName: rawData.nickName,
        gender: rawData.gender,
        city: rawData.city,
        province: rawData.province,
        avatarUrl: rawData.avatarUrl,
      })
      commit('setToken', res.token)
      commit('setUserInfo', JSON.parse(userProfile.rawData))
    },
    logout({ commit }) {
      commit('removeToken')
      commit('removeUserInfo')
    },
    async isLogin({ state }) {
      if (state.token) return true
      // 如果用户未登录，则引导用户进入登录页面
      const [error, res] = await uni.showModal({
        title: '登录之后才可以进行后续操作',
        content: '立即跳转到登录页面？（登录后回自动返回当前页面）',
      })
      const { cancel, confirm } = res
      if (confirm) {
        uni.navigateTo({
          url: '/subpkg/pages/login-page/login-page',
        })
      }
      return false
    },
  },
}
