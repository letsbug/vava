import Layout from '@/layouts/Layout'

// modules
import Dashboard from './modules/dashboards'

/**
 * @param nocache {boolean} - Whether the tag needs to cache the route to avoid repeating the rendered DOM
 *                            when switching routes frequently (true - not allow)
 * @param hidden {boolean} - Marks whether the route is visible and displayed when the template is rendered.
 * @type {VueRouter[]}
 */
export const constantRouteMap = [
  { path: '/login', component: () => import('@/modules/account/Login'), hidden: true },
  { path: '/join', component: () => import('@/modules/account/Join'), hidden: true },
  { path: '/password', component: () => import('@/modules/account/PasswordReset'), hidden: true },
  { path: '/error/:code', component: () => import('@/modules/error/Error'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'home',
    children: [{
      path: 'home',
      name: 'Homepage',
      meta: { title: 'Home', icon: 'home' },
      component: () => import('@/modules/homepage/Homepage')
    }]
  },

  // router modules
  Dashboard,

  {
    path: '/report',
    component: Layout,
    children: [{
      path: '',
      name: 'Reports',
      meta: { title: 'Reports', icon: 'chart' },
      component: () => import('@/modules/reports/Reports')
    }]
  },
  { path: '*', redirect: '/error/404', hidden: true }
]

export const asyncRouteMap = []
