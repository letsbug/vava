import Layout from '@/layouts'

export default {
  path: '/dashboard',
  redirect: '/dashboard/',
  component: Layout,
  meta: {
    roles: ['admin']
  },
  sort: 0,
  children: [{
    path: '',
    name: 'Dashboard',
    meta: {
      title: 'dashboard',
      icon: 'chart-dashboard',
      roles: ['admin'],
      nobg: true,
      nocache: true
    },
    component: () => import('@/modules/dashboard')
  }]
}
