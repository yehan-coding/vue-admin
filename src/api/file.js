import request from '@/utils/request'

export function uploadImg(data) {
  return request({
    url: 'update/uploadByteam',
    method: 'post',
    data
  })
}
