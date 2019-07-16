import Layout from '@/layouts'

export default {
  path: '/notification',
  component: Layout,
  redirect: '/notification/',
  sort: 10,
  children: [{
    path: '',
    name: 'Notification',
    meta: { title: 'notification', icon: 'notice' },
    component: () => import('@/modules/notification/Notification')
  }],
  hidden: true
}
