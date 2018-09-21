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
      meta: { title: 'basic use', icon: '' },
      component: () => import('@/modules/tables/BasicUse')
    },
    {
      path: 'dynamic',
      name: 'Dynamic',
      meta: { title: 'dynamic', icon: '' },
      component: () => import('@/modules/tables/Dynamic')
    },
    {
      path: 'editable',
      name: 'Editable',
      meta: { title: 'editable', icon: '' },
      component: () => import('@/modules/tables/Editable')
    },
    {
      path: 'sortable',
      name: 'Sortable',
      meta: { title: 'sortable', icon: '' },
      component: () => import('@/modules/tables/Sortable')
    },
    {
      path: 'draggable',
      name: 'Draggable',
      meta: { title: 'draggable', icon: '' },
      component: () => import('@/modules/tables/Draggable')
    }
  ]
}

export default tables
