const STORAGE_KEY = 'search-list'
const HISTORY_MAX = 10

export default {
  // 独立命名空间
  namespaced: true,
  state: () => {
    return {
      searchData: uni.getStorageSync(STORAGE_KEY) || [],
    }
  },
  mutations: {
    saveToStorage(state) {
      uni.setStorage({
        key: STORAGE_KEY,
        data: state.searchData,
      })
    },
    // 添加数据
    addSearchData(state, val) {
      if (!val) return
      // 数据已存在则删除，新搜索内容展示在旧的前面
      const index = state.searchData.indexOf(val)
      if (index !== -1) {
        state.searchData.splice(index, 1)
      }
      state.searchData.unshift(val)
      if (state.searchData.length > HISTORY_MAX) {
        // 从后面删除超出的历史搜索记录
        state.searchData.splice(HISTORY_MAX)
      }
      this.commit('search/saveToStorage')
    },
    // 删除所有数据
    removeAllSearchData(state) {
      state.searchData = []
      this.commit('search/saveToStorage')
    },
    // 删除指定数据
    removeSearchData(state, index) {
      state.searchData.splice(index, 1)
      this.commit('search/saveToStorage')
    },
  },
}
