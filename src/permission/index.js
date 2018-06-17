/**
 * index.
 * @author: gzb
 * @date: 2018-06-17 18:39
 */

import router from '@/router'
// import store from '@/store'
// element ui global message component
// import { Message } from 'element-ui'
// progress on page top
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
// get token from cookie
// import { getToken } from '@/utilities/Token'

router.beforeEach((to, from, next) => {
  NProgress.start()
  // if (getToken()) {
  //   if (to.path === '/login') {
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else next()
  // }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
