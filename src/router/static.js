import Layout from '@/layouts/Layout'

/**
 * noCache: Marks whether the route is allowed to be cached so that the DOM is repeatedly rendered when routing is frequently switched.
 *          true - not allow
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
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/Dashboard'),
      meta: { title: 'dashboard', nocache: true }
    }]
  }
]
