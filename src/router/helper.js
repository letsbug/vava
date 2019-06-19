import router from './'
import store from '@/store'
import { Token } from '@/tools'
import { Message } from 'element-ui'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

// Route redirect whitelist.
const whitelist = ['/login', '/join', '/password']

function hasPermission(roles, permissionRoles) {
  if (~roles.indexOf('admin') || !permissionRoles) return true // admin permission passed directly
  return roles.some(role => ~permissionRoles.indexOf(role))
}

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  if (Token.get()) {
    // When the user has already logged in.
    if (whitelist.indexOf(to.path) !== -1) {
      next('/')
      NProgress.done()
    } else {
      const { roles } = store.getters

      if (roles && roles.length > 0) {
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/error', replace: true, query: { code: 403, noGoBack: true }})
        }
      } else {
        try {
          const { roles } = await store.dispatch('user_info')
          await store.dispatch('perm_generate_routes', roles)
          // Remove this line when you need to change permissions dynamically,
          // and import all routes when the vue route is initialized
          // router.addRoutes(store.getters.routes_addons)

          // replace: true so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (e) {
          await store.dispatch('user_exit')

          Message.error(e || 'Verification failed, please login again.')
          next('/')
          NProgress.done()
        }
      }
    }
  } else {
    // redirected to the login page.
    // The user is not logged in.
    if (whitelist.indexOf(to.path) === -1) {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    } else {
      next()
    }
    // The user login has expired.
    if (store.getters.user.token) {
      await store.dispatch('user_logout')
      Message({
        type: 'error',
        message: 'Your login has expired. Please login again.',
        duration: 0
      })
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
