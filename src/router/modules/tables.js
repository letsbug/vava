import Layout from '@/layouts'

const tables = {
  path: '/tables',
  redirect: '/tables/basic',
  component: Layout,
  name: 'Tables',
  meta: {
    title: 'tables',
    icon: 'chart-table'
  },
  children: [
    {
      path: 'basic',
      name: 'Basic',
      meta: { title: 'basic use', icon: 'chart-list' },
      component: () => import('@/modules/tables/BasicUse')
    },
    {
      path: 'dynamic',
      name: 'Dynamic',
      meta: { title: 'dynamic', icon: 'chart-dynamic' },
      component: () => import('@/modules/tables/Dynamic')
    },
    {
      path: 'editable',
      name: 'Editable',
      meta: { title: 'editable', icon: 'action-edit' },
      component: () => import('@/modules/tables/Editable')
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
