import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/api?method=admin.news.search',
    method: 'post',
    data: {
      params: JSON.stringify(data)
    }
  })
}
