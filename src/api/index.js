import request from '@/utils/request'

export function countUser() {
  return request({
    url: '/topic/userCount',
    method: 'get'
  })
}

export function firstNotice() {
  return request({
    url: '/topic/frist',
    method: 'get'
  })
}

export function getSwiperList() {
  return request({
    url: '/topic/imageList',
    method: 'get'
  })
}
