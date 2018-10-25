import Layout from '@/layouts'

export default {
  path: '/excel',
  component: Layout,
  name: 'Excel',
  meta: {
    title: 'Excel',
    icon: 'file-excel'
  },
  children: [
    {
      path: 'import',
      name: 'Import',
      meta: { title: 'Excel Import', icon: 'file-import' },
      component: () => import('@/modules/excel/Import')
    },
    {
      path: 'export',
      name: 'Export',
      meta: { title: 'Excel Export', icon: 'file-export' },
      component: () => import('@/modules/excel/Export')
    }
  ]
}
