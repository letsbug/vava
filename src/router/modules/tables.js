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
      path: 'draggable',
      name: 'Draggable',
      meta: { title: 'draggable', icon: '' },
      component: () => import('@/modules/tables/Draggable')
    }
  ]
}

export default tables
