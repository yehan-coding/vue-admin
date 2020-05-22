import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/topic/amdinImageList',
    method: 'post',
    data
  })
}

export function audit(data) {
  return request({
    url: '/topic/imageListByUpdate',
    method: 'post',
    data
  })
}

export function delet(data) {
  return request({
    url: '/topic/imageListByDelete',
    method: 'post',
    data
  })
}

export function upload(data) {
  return request({
    url: '/topic/upload',
    method: 'post',
    data
  })
}
