import Layout from '@/layouts'

export default {
  path: '/cache',
  component: Layout,
  redirect: '/cache/',
  sort: 3,
  children: [{
    path: '',
    name: 'Cache',
    meta: { title: 'cache', icon: 'chart-bar' },
    component: () => import('@/modules/cache')
  }]
}
