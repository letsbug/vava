// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'normalize.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/display.css'

import '@/styles/va.core.scss' // System global css

import App from './App'
import store from './store'
import router from './router'
import Meta from 'vue-meta'

import i18n from '@/langs'

import '@/router/helper' // router helper, user permission control.
import '@/simulates' // mock simulate
import '@/assets/icons' // load system svg icons by symbol.
import '@/assets/svgs'

import * as filters from '@/filters'

import '@/themes'

// Inject global directives, or local calls, as needed.
// import * as Directives from '@/directives'

// Baidu & Google analytics
import hmt from 'vue-ba'
import vga from 'vue-analytics'

Vue.config.productionTip = false

Vue.use(Element, {
  size: 'medium',
  i18n: (path, option) => i18n.t(path, option)
})
Vue.use(Meta)

// register global filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// Inject global directives, or local calls, as needed.
// Object.keys(Directives).forEach(key => {
//   Vue.directive(key, Directives[key])
// })

Vue.use(hmt, { siteId: '9e73d1f3aef423e62a00c7575a9c0f08', debug: process.env.NODE_ENV !== 'prod' })
Vue.use(vga, { id: 'UA-106135225-2' })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
