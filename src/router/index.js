import Vue from 'vue'
import Router from 'vue-router'

import { constantRouteMap, asyncRouteMap } from '@/router/routes'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [].concat(constantRouteMap, asyncRouteMap)
})
