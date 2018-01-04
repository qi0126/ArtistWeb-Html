import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store'
import '@/configuration'
import '@/commons/stylus/base.styl'
import '@/commons/theme/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
