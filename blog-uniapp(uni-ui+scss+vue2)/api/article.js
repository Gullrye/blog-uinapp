import request from 'utils/request'

export function getArticleDetail(data) {
  return request({
    url: '/article/details',
    data,
  })
}

export function getArticleCommentList(data) {
  return request({
    url: '/article/comment/list',
    data,
  })
}
