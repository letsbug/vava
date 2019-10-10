import Layout from '@/layouts/index.vue';
import { RouteConfig } from 'vue-router';

const clipboard: RouteConfig = {
  path: '/clipboard',
  component: Layout,
  redirect: '/clipboard/',
  meta: { sort: 9 },
  children: [
    {
      path: '',
      name: 'Clipboard',
      meta: { title: 'clipboard', icon: 'action-clipboard' },
      component: () => import('@/modules/clipboard.vue')
    }
  ]
};

export default clipboard;
