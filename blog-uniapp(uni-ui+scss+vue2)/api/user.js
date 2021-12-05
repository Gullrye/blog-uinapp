import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    data,
    method: 'POST'
  })
}

export function userFollow(data) {
  return request({
    url: '/user/follow',
    data
  })
}

export function userComment(data) {
  return request({
    url: '/user/article/comment',
    data,
    method: 'POST'
  })
}
