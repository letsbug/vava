import Layout from '@/layouts/index.vue';
import { RouteConfig } from 'vue-router';

const externals: RouteConfig = {
  path: '/externals',
  component: Layout,
  meta: { sort: 11 },
  children: [
    {
      path: 'https://google.com',
      meta: { title: 'externalLink', icon: 'thing-clip' },
    },
  ],
};

export default externals;
