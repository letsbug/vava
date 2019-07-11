import Layout from '@/layouts'

export default {
  path: '/clipboard',
  component: Layout,
  redirect: '/clipboard/',
  sort: 8,
  children: [{
    path: '',
    name: 'Clipboard',
    meta: { title: 'clipboard', icon: 'action-clipboard' },
    component: () => import('@/modules/clipboard')
  }]
}
