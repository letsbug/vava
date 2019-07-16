import Layout from '@/layouts'

const tables = {
  path: '/tables',
  redirect: '/tables/table-full-feature',
  component: Layout,
  name: 'Tables',
  meta: {
    title: 'table',
    icon: 'chart-table'
  },
  sort: 5,
  children: [
    {
      path: 'table-inline-edit',
      name: 'InlineEdit',
      meta: { title: 'inlineEdit', icon: 'action-edit' },
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
    },
    {
      path: 'table-full-feature',
      name: 'FullFeature',
      meta: { title: 'fullFeature', icon: 'chart-dynamic' },
      component: () => import('@/modules/tables/FullFeature')
    }
  ]
}

export default tables
