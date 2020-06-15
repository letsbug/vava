import Layout from '@/layouts/index.vue';
import { RouteConfig } from 'vue-router';

const cache: RouteConfig = {
  path: '/cache',
  component: Layout,
  redirect: '/cache/',
  meta: { sort: 3 },
  children: [
    {
      path: '',
      name: 'Cache',
      meta: { title: 'cache', icon: 'chart-bar' },
      component: () => import('@/modules/cache/index.vue'),
    },
  ],
};

export default cache;
