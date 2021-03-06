import request from '@/utils/request'

export function detail(data) {
  return request({
    url: '/teacher/itemById',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/teacher/update',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: '/student/searchBySubject',
    method: 'post',
    data
  })
}

export function updateTopic (data) {
  return request({
    url: '/teacher/audit',
    method: 'post',
    data
  })
}
