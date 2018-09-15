// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Element from 'element-ui'
import 'normalize.css'
import '@/styles-element/element-reboot.scss'
import 'element-ui/lib/theme-chalk/display.css'
import '@/styles/va.core.scss'

import App from './App'
import router from './router'
import store from './store'
import Meta from 'vue-meta'

import '@/assets/icons'

Vue.config.productionTip = false

Vue.use(Element)
Vue.use(Meta)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
