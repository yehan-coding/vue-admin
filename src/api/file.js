import request from '@/utils/request'

export function uploadImg(data) {
  return request({
    url: '/upload/updateImg',
    method: 'post',
    data
  })
}
