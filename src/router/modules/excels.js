import Layout from '@/layouts'

export default {
  path: '/excel',
  redirect: '/excel/export',
  component: Layout,
  name: 'Excel',
  meta: {
    title: 'excel',
    icon: 'file-excel'
  },
  sort: 8,
  children: [
    {
      path: 'export',
      name: 'Export',
      meta: { title: 'excelExport', icon: 'action-export' },
      component: () => import('@/modules/excel/Export')
    },
    {
      path: 'import',
      name: 'Import',
      meta: { title: 'excelImport', icon: 'action-import', nocache: true },
      component: () => import('@/modules/excel/Import')
    }
  ]
}
