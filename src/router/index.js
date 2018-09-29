import Vue from 'vue'
import Router from 'vue-router'

import { constantRouteMap } from '@/router/routes'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: constantRouteMap
})
