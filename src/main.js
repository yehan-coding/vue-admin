import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

import App from './App'
import store from './store'
import router from './router'
import moment from 'moment'
import Pagination from '@/components/Pagination'
import * as filters from './filters'
Vue.component('Pagination', Pagination)

import './icons'
import './permission'

Vue.use(ElementUI)
Vue.prototype.$moment = moment
// Vue.prototype.$imgServer = 'http://e29990571v.zicp.vip'
Vue.prototype.$imgServer = 'http://192.168.1.118:9898'

// 注册全局过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
