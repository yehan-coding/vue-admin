import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function update(data) {
  return request({
    url: '/user/updateInfo',
    method: 'post',
    data
  })
}

export function getTeacherList(data) {
  return request({
    url: '/student/list',
    method: 'post',
    data
  })
}

export function confirmTopic(data) {
  return request({
    url: '/student/add',
    method: 'post',
    data
  })
}

export function mySelectList(data) {
  return request({
    url: '/teacher/listBySubject',
    method: 'post',
    data
  })
}

export function messageCount(data) {
  return request({
    url: '/topic/count',
    method: 'post',
    data
  })
}

export function updatePwd(data) {
  return request({
    url: '/user/updatePwd',
    method: 'post',
    data
  })
}
