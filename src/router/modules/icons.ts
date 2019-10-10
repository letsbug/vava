import Layout from '@/layouts/index.vue';
import { RouteConfig } from 'vue-router';

const icons: RouteConfig = {
  path: '/icons',
  component: Layout,
  redirect: '/icons/',
  meta: { sort: 6 },
  children: [
    {
      path: '',
      name: 'VaIcons',
      meta: {
        title: 'iconViewer',
        icon: 'file-folder',
        nocache: true
      },
      component: () => import('@/modules/icons/IconViewer.vue')
    }
  ]
};

export default icons;
