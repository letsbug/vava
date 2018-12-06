import Vue from 'vue'
import Router from 'vue-router'

import { constantRouteMap, asyncRouteMap } from '@/router/routes'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',

  // Fully import only when permissions need to be changed dynamically.
  routes: constantRouteMap.concat(asyncRouteMap)
  // routes: constantRouteMap
})
