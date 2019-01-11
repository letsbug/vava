import Layout from '@/layouts'

export default {
  path: '/dashboard',
  redirect: '/dashboard/visitor',
  component: Layout,
  name: 'Dashboard',
  meta: {
    title: 'dashboard',
    icon: 'chart-dashboard',
    roles: ['admin']
  },
  children: [
    {
      path: 'pv',
      name: 'pageViews',
      meta: {
        title: 'pv',
        icon: 'thing-footprint',
        nobg: true,
        roles: ['admin']
      },
      component: () => import('@/modules/dashboard/pv')
    },
    {
      path: 'users',
      name: 'Users',
      meta: {
        title: 'users',
        icon: 'people-user',
        nobg: true,
        roles: ['admin']
      },
      component: () => import('@/modules/dashboard/Users')
    },
    {
      path: 'capital',
      name: 'Capital',
      meta: {
        title: 'capital',
        icon: 'mark-capital',
        nobg: true,
        roles: ['admin']
      },
      component: () => import('@/modules/dashboard/Capital')
    }
  ]
}
