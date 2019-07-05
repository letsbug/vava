import Layout from '@/layouts'

// modules
import { Dashboard, Permissions, Components, Tables, Excels } from './modules'

/**
 * @param hidden {boolean} - Marks whether the route is visible and displayed when the template is rendered.
 * @param alwaysShow: {boolean} - Always show the root menu in side-menu, whatever its child routes length
 * @param meta {Object}
 *        title {string} - side-menu & tab-bar display name.
 *        icon {string} -  side-menu display icon name.
 *        notab {boolean} - Mark whether this route is not shown in the system TAB bar (true - not show).
 *        nobg {boolean} - Whether to remove the background color of the route page (true - remove).
 *        nocache {boolean} - Mark whether route is allowed to be cached (true - not allow).
*         roles {Array} - Role permission list for route.
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

  { path: '/error', component: () => import('@/modules/errors'), hidden: true },

  {
    path: '/search/:keyword',
    component: Layout,
    redirect: '/search/',
    children: [{
      path: '',
      name: 'GlobalSearch',
      meta: { title: 'search', icon: 'action-search', notab: true },
      component: () => import('@/modules/search/GlobalSearch')
    }],
    hidden: true
  },

  {
    path: '',
    component: Layout,
    redirect: 'home',
    children: [{
      path: 'home',
      name: 'Homepage',
      meta: { title: 'home', icon: 'thing-house', nobg: true, nocache: true },
      component: () => import('@/modules/homepage/Homepage')
    }]
  },

  {
    path: '/about',
    component: Layout,
    redirect: '/about/',
    children: [{
      path: '',
      name: 'About',
      meta: { title: 'about', icon: 'mark-states-info', nocache: true },
      component: () => import('@/modules/about')
    }]
  },

  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/',
    children: [{
      path: '',
      name: 'Guide',
      meta: { title: 'guide', icon: 'action-guide' },
      component: () => import('@/modules/guide')
    }]
  }
]

export const asyncRouteMap = [

  Dashboard,

  Permissions,

  {
    path: '/cache',
    component: Layout,
    redirect: '/cache/',
    children: [{
      path: '',
      name: 'Cache',
      meta: { title: 'cache', icon: 'chart-bar' },
      component: () => import('@/modules/cache')
    }]
  },

  Components,

  Tables,

  {
    path: '/icons',
    component: Layout,
    redirect: '/icons/',
    children: [{
      path: '',
      name: 'VaIcons',
      meta: {
        title: 'iconViewer',
        icon: 'file-folder',
        nocache: true
      },
      component: () => import('@/modules/icons/IconViewer')
    }]
  },

  {
    path: '/exception',
    component: Layout,
    redirect: '/exception',
    children: [{
      path: '',
      name: 'Exception',
      meta: { title: 'exception', icon: 'mark-exception', nocache: true },
      component: () => import('@/modules/exception')
    }]
  },

  Excels,

  {
    path: '/clipboard',
    component: Layout,
    redirect: '/clipboard/',
    children: [{
      path: '',
      name: 'Clipboard',
      meta: { title: 'clipboard', icon: 'action-clipboard' },
      component: () => import('@/modules/clipboard')
    }]
  },

  {
    path: '/notification',
    component: Layout,
    redirect: '/notification/',
    children: [{
      path: '',
      name: 'Notification',
      meta: { title: 'notification', icon: 'notice' },
      component: () => import('@/modules/notification/Notification')
    }],
    hidden: true
  },

  {
    path: 'externals',
    component: Layout,
    children: [{
      path: 'https://google.com',
      meta: { title: 'externalLink', icon: 'thing-clip' }
    }]
  },

  // The path not found in the router list will be forced a redirect to the 404 page
  { path: '*', redirect: '/error', hidden: true }
]
