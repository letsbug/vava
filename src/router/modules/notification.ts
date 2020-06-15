import Layout from '@/layouts/index.vue';
import { RouteConfig } from 'vue-router';

const notifications: RouteConfig = {
  path: '/notification',
  component: Layout,
  redirect: '/notification/',
  meta: {
    hidden: true,
    sort: 10,
  },
  children: [
    {
      path: '',
      name: 'Notification',
      meta: { title: 'notification', icon: 'notice' },
      component: () => import('@/modules/notification/Notification.vue'),
    },
  ],
};

export default notifications;
