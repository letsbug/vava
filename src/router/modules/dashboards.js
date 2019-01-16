import Layout from '@/layouts'

export default {
  path: '/dashboard',
  redirect: '/dashboard/',
  component: Layout,
  meta: {
    roles: ['admin']
  },
  children: [
    {
      path: '',
      name: 'Dashboard',
      meta: {
        title: 'dashboard',
        icon: 'chart-dashboard',
        roles: ['admin'],
        nobg: true
      },
      component: () => import('@/modules/dashboard')
    }
  ]
}
