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
    meta: { title: 'Home', icon: 'house' },
    children: [{
      path: 'home',
      name: 'Homepage',
      component: () => import('@/modules/homepage/Homepage')
    }]
  },

  // router modules
  Dashboard,

  {
    path: '/report',
    component: Layout,
    meta: { title: 'Reports', icon: 'chart' },
    children: [{
      path: '',
      name: 'Reports',
      component: () => import('@/modules/reports/Reports')
    }]
  },
  {
    path: 'icons',
    component: Layout,
    meta: { title: 'icon views', icon: 'store' },
    children: [{
      path: '',
      name: 'VaIcons',
      component: () => import('@/modules/icons/SystemIcons')
    }]
  },
  { path: '*', redirect: '/error/404', hidden: true }
]

export const asyncRouteMap = []
