import Vue from 'vue'
import Router from 'vue-router'

import { constantRouterMap } from './routes'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: constantRouterMap
})
