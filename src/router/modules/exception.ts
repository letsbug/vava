import Layout from '@/layouts/index.vue';
import { RouteConfig } from 'vue-router';

const exceptions: RouteConfig = {
  path: '/exception',
  component: Layout,
  redirect: '/exception',
  meta: { sort: 7 },
  children: [
    {
      path: '',
      name: 'Exception',
      meta: { title: 'exception', icon: 'mark-exception', nocache: true },
      component: () => import('@/modules/exception/index.vue'),
    },
  ],
};

export default exceptions;
