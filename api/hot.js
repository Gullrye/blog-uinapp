import request from '../utils/request'

// 热搜头部 tab 栏
export function getHotTabs() {
  return request({
    url: '/hot/tabs',
  })
}
