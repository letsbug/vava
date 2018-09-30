import router from './'
import store from '@/store'
import { Token } from '@/tools'
import { Message } from 'element-ui'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

// Route redirect whitelist.
const whitelist = ['/login', '/join', '/password']

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (Token.get()) {
    // When the user has already logged in.
    if (whitelist.indexOf(to.path) !== -1) {
      next('/')
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('user_info').then(res => {
          const roles = res.data.roles
          store.dispatch('perm_generate_routes', { roles }).then(() => {
            router.addRoutes(store.getters.routes_addons)
            // hack方法 确保addRoutes已完成, set the replace: true so the navigation will not leave a history record
            next({ ...to, replace: true })
          })
        }).catch(err => {
          store.dispatch('user_exit').then(() => {
            Message.error(err.message || 'Verification failed, please login again.')
            next('/')
          })
        })
      } else next()
    }
  } else {
    // When the user is not logged in, the route is redirected to the login page.
    if (whitelist.indexOf(to.path) === -1) {
      next({
        path: '/login',
        query: { redirect: to.path }
      })
      NProgress.done()
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
