import Layout from '@/layouts/index.vue';
import { RouteConfig } from 'vue-router';

const dashboard: RouteConfig = {
  path: '/dashboard',
  redirect: '/dashboard/',
  component: Layout,
  meta: {
    roles: ['admin'],
    sort: 0
  },
  children: [
    {
      path: '',
      name: 'Dashboard',
      meta: {
        title: 'dashboard',
        icon: 'chart-dashboard',
        roles: ['admin'],
        nobg: true,
        nocache: true
      },
      component: () => import('@/modules/dashboard/index.vue')
    }
  ]
};

export default dashboard;
