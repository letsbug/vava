import Layout from '@/layouts/Layout'

const dashboards = {
  path: '/dashboard',
  redirect: '/dashboard/visits',
  component: Layout,
  name: 'Dashboard',
  meta: {
    title: 'dashboard',
    icon: 'dashboard'
  },
  children: [
    {
      path: 'visitor',
      name: 'Visitor',
      meta: { title: 'visitor', icon: 'history' },
      component: () => import('@/modules/dashboard/Visitor')
    },
    {
      path: 'users',
      name: 'Users',
      meta: { title: 'users', icon: 'user' },
      component: () => import('@/modules/dashboard/Users')
    },
    {
      path: 'capital',
      name: 'Capital',
      meta: { title: 'capital', icon: 'capital' },
      component: () => import('@/modules/dashboard/Capital')
    }
  ]
}

export default dashboards
