// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'normalize.css'

import Element from 'element-ui'
// Override element-ui primary color
import '@/style-element-reboot/element-reboots.scss'
import 'element-ui/lib/theme-chalk/display.css'
import '@/styles/core.admin.frame.scss'

import App from './App'
import store from '@/store'
import router from '@/router'
import '@/router/helper'

// Data simulation
import '@/simulate'

// Global filters
import * as filters from '@/utilities/Filters'

// 百度统计
import hmt from 'vue-ba'
const hmt_options = {
  siteId: '9e73d1f3aef423e62a00c7575a9c0f08',
  debug: process.env.NODE_ENV !== 'production'
}

Vue.use(Element, { size: 'small' })
Vue.use(hmt, hmt_options)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
