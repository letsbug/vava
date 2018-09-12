/**
 * index.
 * @author: gzb
 * @date: 2018-06-17 18:39
 */

import router from '@/router/index'
import store from '@/store'
// element ui global message component
import { Message } from 'element-ui'
// progress on page top
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
// get token from cookie
import { Token } from '@/utilities'
NProgress.configure({ showSpinner: false })
// noredirect whitelist
const whiteList = ['/login', '/authredirect']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (Token.get()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('user_info').then(res => { // 拉取user_info
          const roles = res.data.roles // note: roles must be a array! such as: ['editor','develop']
          store.dispatch('perm_generate_routes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRoutes) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch((err) => {
          store.dispatch('user_logout_fed').then(() => {
            Message.error(err.message || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else next()
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
