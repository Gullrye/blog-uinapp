// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
  vm.$u.api = {}

  // params 是一个键值对，键名见文档！！！

  // 0. 用户信息
  // 登录（微信用户）
  vm.$u.api.login = (params = {}) => vm.$u.post('/sys/login', params)

  // 1. 热搜
  // 文章类型
  vm.$u.api.getTabList = () => vm.$u.get('/hot/tabs')
  // 文章列表
  vm.$u.api.getHotList = (tabId) => vm.$u.get('/hot/list', {type: tabId})

  // 2. 文章搜索
  // 热搜搜索列表
  vm.$u.api.getHotSearchList = () => vm.$u.get('/search/hot-list')
  // 搜索结果
  vm.$u.api.getSearchResult = (params = {}) => vm.$u.get('/search', params)
  // 返回默认搜索内容
  vm.$u.api.getSearchDefaultText = () => vm.$u.get('/search/default-text')

  // 3. 文章详情
  // 文章详情
  vm.$u.api.getArticleDetail = (params = {}) =>
    vm.$u.get('/article/details', params)
  // 文章评论列表
  vm.$u.api.getArticleComment = (params = {}) =>
    vm.$u.get('/article/comment/list', params)

  // 4. 需要登录验证的操作
  // 关注用户
  vm.$u.api.userFollow = (token) => vm.$u.get('/user/follow', {Authorization: token})
  // 文章点赞
  vm.$u.api.userLike = (token) => vm.$u.get('/user/praise', {Authorization: token})
  // 文章收藏
  vm.$u.api.userCollect = (token) => vm.$u.get('/user/collect', {Authorization: token})
  // 发布文章和视频评论
  vm.$u.api.userComment = (token) => vm.$u.post('/user/article/comment', {Authorization: token})

  // 5. 热播
  // 热播列表
  vm.$u.api.getHotVideoList = (params = {}) => vm.$u.get('/video/list', params)
  // 视频弹幕
  vm.$u.api.getHotVideoDanmu = (params = {}) =>
    vm.$u.get('/video/danmu', params)
  // 视频评论
  vm.$u.api.getHotVideoComment = (params = {}) =>
    vm.$u.get('/video/comment/list', params)
}

export default {
  install,
}
