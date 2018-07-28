// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'normalize.css'

import Element from 'element-ui'
// Override element-ui primary color
import '@/styles/element-theme.scss'
import 'element-ui/lib/theme-chalk/display.css'
import '@/styles/core.admin.frame.scss'

import router from '@/router'
import '@/router/helper'
import store from '@/store'

import App from './App'

// Data simulation
import '@/simulate'

// Global filters
import * as filters from '@/utilities/Filters'

Vue.use(Element, { size: 'small' })

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
