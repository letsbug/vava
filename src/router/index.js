import Vue from 'vue'
import Router from 'vue-router'

import { constantRouteMap, asyncRouteMap } from '@/router/routes'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',

  // When loading on demand, only constants need to be initialize here
  // routes: constantRouteMap

  // Fully loaded when no need to load as needed
  routes: constantRouteMap.concat(asyncRouteMap)
})
