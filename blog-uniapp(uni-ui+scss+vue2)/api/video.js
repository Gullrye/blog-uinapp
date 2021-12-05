import request from '@/utils/request'

export function getHotVideoList(data) {
  return request({
    url: '/video/list',
    data,
  })
}
// 弹幕
export function getVideoDanmuList(data) {
  return request({
    url: '/video/danmu',
    data,
  })
}
