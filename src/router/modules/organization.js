import Layout from '@/layouts'

export default {
  path: '/organization',
  component: Layout,
  redirect: '/organization/',
  sort: 2,
  children: [{
    path: '',
    name: 'Organization',
    meta: {
      title: 'organization',
      icon: 'mark-org',
      nocache: true
    },
    component: () => import('@/modules/organization')
  }]
}
