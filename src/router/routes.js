import Layout from '@/layouts'

/*
 * hidden {boolean}       Marks whether the route is visible and displayed when the template is rendered.
 * alwaysShow: {boolean}  Always show the root menu in side-menu, whatever its child routes length
 * meta: {
 *  title {string}        side-menu & tab-bar display name.
 *  icon {string}         side-menu display icon name.
 *  notab {boolean}       Mark whether this route is not shown in the system TAB bar (true - not show).
 *  nobg {boolean}        Whether to remove the background color of the route page (true - remove).
 *  nocache {boolean}     Mark whether route is allowed to be cached (true - not allow).
 *  roles {Array}         Role permission list for route.
 * }
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{ path: '/redirect/:path*', component: () => import('@/modules/redirect/index') }]
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

const errorRoute = { path: '*', redirect: '/error', hidden: true }

// load routes
const routeFiles = require.context('./modules', true, /\.js$/)
const modules = routeFiles.keys()
  .map(path => routeFiles(path).default)
  .sort((a, b) => a.sort > b.sort ? 1 : -1)

modules.push(errorRoute)

export const asyncRoutes = modules
