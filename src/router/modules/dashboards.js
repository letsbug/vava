import Layout from '@/layouts/Layout'

const dashboards = {
  path: '/dashboard',
  redirect: '/dashboard/visits',
  component: Layout,
  name: 'Dashboard',
  meta: {
    title: 'Dashboard',
    icon: 'dashboard'
  },
  children: [
    {
      path: 'visits',
      name: 'Visits',
      meta: { title: 'visits' },
      component: () => import('@/modules/dashboard/Visits')
    },
    {
      path: 'income',
      name: 'income',
      meta: { title: 'income' },
      component: () => import('@/modules/dashboard/Income')
    },
    {
      path: 'users',
      name: 'users',
      meta: { title: 'users' },
      component: () => import('@/modules/dashboard/Users')
    }
  ]
}

export default dashboards
