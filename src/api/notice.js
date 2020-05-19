import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/topic/noticeList',
    method: 'post',
    data
  })
}

export function detail(data) {
  return request({
    url: '/topic/searchNoticeById',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/topic/updateNotice',
    method: 'post',
    data
  })
}

export function delet(data) {
  return request({
    url: '/topic/delete',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/topic/addNotice',
    method: 'post',
    data
  })
}
