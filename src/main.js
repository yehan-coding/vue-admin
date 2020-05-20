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
Vue.component('Pagination', Pagination)

import '@/icons'
import '@/permission'

Vue.use(ElementUI)
Vue.prototype.$moment = moment
Vue.prototype.$imgServer = 'http://e29990571v.zicp.vip'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
