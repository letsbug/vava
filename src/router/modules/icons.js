import Layout from '@/layouts'

export default {
  path: '/icons',
  component: Layout,
  redirect: '/icons/',
  sort: 6,
  children: [{
    path: '',
    name: 'VaIcons',
    meta: {
      title: 'iconViewer',
      icon: 'file-folder',
      nocache: true
    },
    component: () => import('@/modules/icons/IconViewer')
  }]
}
