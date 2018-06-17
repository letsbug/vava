// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'normalize.css'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/admin.frame.core.scss'

import router from './router'
import store from '@/store'

import App from './App'

import '@/permission'
import '@/simulate'

Vue.use(Element, { size: 'small' })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
