import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/topic/list',
    method: 'post',
    data
  })
}

export function audit(data) {
  return request({
    url: '/topic/audit',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/teacher/updateTopic',
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
    url: '/teacher/addTopic',
    method: 'post',
    data
  })
}

export function my(data) {
  return request({
    url: '/teacher/list',
    method: 'post',
    data
  })
}

export function detail(data) {
  return request({
    url: '/teacher/listById',
    method: 'post',
    data
  })
}

export function studentTopicList(data) {
  return request({
    url: '/teacher/listBySubject',
    method: 'post',
    data
  })
}

export function paperAudit(data) {
  return request({
    url: '/teacher/audit',
    method: 'post',
    data
  })
}

export function paperList(data) {
  return request({
    url: '/teacher/item',
    method: 'post',
    data
  })
}
