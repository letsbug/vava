import Layout from '@/layouts'

export default {
  path: '/exception',
  component: Layout,
  redirect: '/exception',
  sort: 7,
  children: [{
    path: '',
    name: 'Exception',
    meta: { title: 'exception', icon: 'mark-exception', nocache: true },
    component: () => import('@/modules/exception')
  }]
}
