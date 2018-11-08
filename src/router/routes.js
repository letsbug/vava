import Layout from '@/layouts'

// modules
import Dashboard from './modules/dashboards'
import Tables from './modules/tables'
import Excels from './modules/excels'

/**
 * @param nocache {boolean} - Whether the tag needs to cache the route to avoid repeating the rendered DOM
 *                            when switching routes frequently (true - not allow)
 * @param hidden {boolean} - Marks whether the route is visible and displayed when the template is rendered.
 * @param meta {Object}
 *        title - side-menu & tab-bar display name
 *        icon -  side-menu display icon.
 *        notab - Do not add in tabs-bar.
 *        nobg - remove AppBody component's background, must use in secondary route.
 * @type {VueRouter[]}
 */
export const constantRouteMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/modules/redirect/index')
      }
    ]
  },
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
      meta: { title: 'Home', icon: 'house', nobg: true },
      component: () => import('@/modules/homepage/Homepage')
    }]
  },

  Dashboard,

  {
    path: '/report',
    component: Layout,
    redirect: '/report/',
    children: [{
      path: '',
      name: 'Reports',
      meta: { title: 'reports', icon: 'chart', nobg: true },
      component: () => import('@/modules/reports/Reports')
    }]
  },

  Tables,

  {
    path: '/icons',
    component: Layout,
    redirect: '/icons/',
    children: [{
      path: '',
      name: 'VaIcons',
      meta: { title: 'icon viewer', icon: 'folder' },
      component: () => import('@/modules/icons/IconViewer')
    }]
  },

  Excels,

  {
    path: '/notifications',
    component: Layout,
    redirect: '/notifications/',
    children: [{
      path: '',
      name: 'Notification',
      meta: { title: 'notifications', icon: 'notice' },
      component: () => import('@/modules/notification/Notification')
    }],
    hidden: true
  },
  {
    path: '/search/:keyword',
    component: Layout,
    redirect: '/search/',
    children: [{
      path: '',
      name: 'GlobalSearch',
      meta: { title: 'search', icon: 'search', notab: true },
      component: () => import('@/modules/search/GlobalSearch')
    }],
    hidden: true
  },

  // The path not found in the router list will be forced a redirect to the 404 page
  { path: '*', redirect: '/error/404', hidden: true }
]

export const asyncRouteMap = []
