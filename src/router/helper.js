import router from './'
import store from '@/store'
import { Token } from '@/tools'
import { Message } from 'element-ui'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

// Route redirect whitelist.
const whitelist = ['/login', '/join', '/password']

router.beforeEach(async(to, from, next) => {
  NProgress.start()

  if (Token.get()) {
    if (whitelist.includes(to.path)) {
      // When the user has already logged in.
      next('/')
      NProgress.done()
      return
    }

    const { roles } = store.getters

    if (roles && roles.length > 0) {
      next()
      return
    }

    try {
      const roles = await store.dispatch('user_info')

      // generate accessible routes through roles
      const accessRoutes = await store.dispatch('perm_generate_routes', roles)
      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // replace: true so the navigation will not leave a history record
      next({ ...to, replace: true })
    } catch (e) {
      // re-login
      await store.dispatch('user_token_clear')

      Message.error(e || 'Verification failed, please login again.')
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  } else {
    // redirected to the login page.
    // The user is not logged in.
    if (whitelist.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
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
