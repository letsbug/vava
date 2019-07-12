import Vue from 'vue'
import Router from 'vue-router'
import { constantRoutes } from '@/router/routes'

Vue.use(Router)

const createRouter = () => new Router({
  linkExactActiveClass: 'active',
  scrollBehavior: (to, from, savedPosition) => savedPosition || ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// 异步路由加载变动时调用，刷新路由列表。
// https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
