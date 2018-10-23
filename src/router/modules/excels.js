import Layout from '@/layouts/Layout'

export default {
  path: '/excel',
  component: Layout,
  name: 'Excel',
  meta: {
    title: 'Excel',
    icon: 'excel'
  },
  children: [
    {
      path: 'import',
      name: 'Import',
      meta: { title: 'Import Excel', icon: 'import' },
      component: () => import('@/modules/excel/Import')
    },
    {
      path: 'export',
      name: 'Import',
      meta: { title: 'Export Excel', icon: 'export' },
      component: () => import('@/modules/excel/Export')
    }
  ]
}
