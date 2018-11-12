import Layout from '@/layouts'

const tables = {
  path: '/tables',
  redirect: '/tables/dynamic',
  component: Layout,
  name: 'Tables',
  meta: {
    title: 'tables',
    icon: 'chart-table'
  },
  children: [
    {
      path: 'dynamic',
      name: 'Dynamic',
      meta: { title: 'dynamic', icon: 'chart-dynamic' },
      component: () => import('@/modules/tables/Dynamic')
    },
    {
      path: 'table-inline-edit',
      name: 'InlineEdit',
      meta: { title: 'InlineEdit', icon: 'action-edit' },
      component: () => import('@/modules/tables/InlineEdit')
    },
    {
      path: 'sortable',
      name: 'Sortable',
      meta: { title: 'sortable', icon: 'mark-list' },
      component: () => import('@/modules/tables/Sortable')
    },
    {
      path: 'draggable',
      name: 'Draggable',
      meta: { title: 'draggable', icon: 'action-drag' },
      component: () => import('@/modules/tables/Draggable')
    }
  ]
}

export default tables
