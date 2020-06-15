import Layout from '@/layouts/index.vue';
import { RouteConfig } from 'vue-router';

const tables: RouteConfig = {
  path: '/tables',
  redirect: '/tables/table-full-feature',
  component: Layout,
  name: 'Tables',
  meta: {
    title: 'table',
    icon: 'chart-table',
    sort: 5,
  },
  children: [
    {
      path: 'table-inline-edit',
      name: 'InlineEdit',
      meta: { title: 'inlineEdit', icon: 'action-edit' },
      component: () => import('@/modules/tables/InlineEdit.vue'),
    },
    {
      path: 'sortable',
      name: 'Sortable',
      meta: { title: 'sortable', icon: 'mark-list' },
      component: () => import('@/modules/tables/Sortable.vue'),
    },
    {
      path: 'draggable',
      name: 'Draggable',
      meta: { title: 'draggable', icon: 'action-drag' },
      component: () => import('@/modules/tables/Draggable.vue'),
    },
    {
      path: 'table-full-feature',
      name: 'FullFeature',
      meta: { title: 'fullFeature', icon: 'chart-dynamic' },
      component: () => import('@/modules/tables/FullFeature.vue'),
    },
  ],
};

export default tables;
