import Layout from '@/layouts/Layout'

/**
 * noCache: Marks whether the route is allowed to be cached so that the DOM is repeatedly rendered when routing is frequently switched.
 *          true - not allow
 * @type {Route[]}
 */
export const constantRouterMap = [
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
