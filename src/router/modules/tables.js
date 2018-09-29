import Layout from '@/layouts/Layout'

const tables = {
  path: '/tables',
  redirect: '/tables/basic',
  component: Layout,
  name: 'Tables',
  meta: {
    title: 'tables',
    icon: 'table'
  },
  children: [
    {
      path: 'basic',
      name: 'Basic',
      meta: { title: 'basic use', icon: 'table-default' },
      component: () => import('@/modules/tables/BasicUse')
    },
    {
      path: 'dynamic',
      name: 'Dynamic',
      meta: { title: 'dynamic', icon: 'dynamic' },
      component: () => import('@/modules/tables/Dynamic')
    },
    {
      path: 'editable',
      name: 'Editable',
      meta: { title: 'editable', icon: 'edit' },
      component: () => import('@/modules/tables/Editable')
    },
    {
      path: 'sortable',
      name: 'Sortable',
      meta: { title: 'sortable', icon: 'sort' },
      component: () => import('@/modules/tables/Sortable')
    },
    {
      path: 'draggable',
      name: 'Draggable',
      meta: { title: 'draggable', icon: 'drag' },
      component: () => import('@/modules/tables/Draggable')
    }
  ]
}

export default tables
