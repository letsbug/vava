import Layout from '@/layouts/Layout'

/**
 * noCache: Marks whether the route is allowed to be cached so that the DOM is repeatedly rendered when routing is frequently switched.
 *          true - not allow
 * hidden:  Marks whether the route is visible and displayed when the template is rendered.
 *          true - hide
 * @type {Route[]}
 */
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/LoginIndex'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPages/error404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/Dashboard'),
      meta: { title: 'Dashboard', icon: 'home', nocache: true }
    }]
  },
  {
    path: '',
    component: Layout,
    children: [{
      path: 'guide',
      name: 'guide',
      component: () => null,
      meta: { title: 'Guide', icon: 'home', nocache: true }
    }]
  }
]
