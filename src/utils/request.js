import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    if (config.url.includes('upload')) {
      config.headers['Content-Type'] = 'multipart/form-data'
    } else {
      config.transformRequest = [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it] == 'object' ? JSON.stringify(data[it]) : data[it]) + '&'
        }
        return ret
      }]
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 200) {
      return res
    } else if (res.code === 401) {
      MessageBox.confirm('登录已失效,请重新登录', '退出登录', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    } else if (res.code === 400) {
      Message({
        message: res.msg,
        type: 'error'
      })
    } else if (res.code === 500) {
      Message({
        message: '服务器发生错误',
        type: 'error'
      })
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
