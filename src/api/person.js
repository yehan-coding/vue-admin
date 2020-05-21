import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}

export function detail(data) {
  return request({
    url: '/user/listById',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

