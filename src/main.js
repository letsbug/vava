// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'normalize.css'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/display.css'
import '@/styles/va.core.scss'

import App from './App'
import store from './store'
import router from './router'
import Meta from 'vue-meta'

import '@/tools/highlight'
import '@/router/helper'
import '@/simulates'

// load system svg icons by symbol.
import '@/assets/icons'

import * as filters from '@/filters'

// Baidu analytics
import hmt from 'vue-ba'

Vue.config.productionTip = false

Vue.use(Element)
Vue.use(Meta)
Vue.use(hmt, { siteId: '9e73d1f3aef423e62a00c7575a9c0f08', debug: process.env.NODE_ENV !== 'prod' })

// register global filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
