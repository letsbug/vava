import Layout from '@/layouts/index.vue';
import { RouteConfig } from 'vue-router';
import { ITypeRoles } from '@/store/modules/user';

const dashboard: RouteConfig = {
  path: '/dashboard',
  redirect: '/dashboard/',
  component: Layout,
  meta: {
    roles: [ITypeRoles.systemAdmin, ITypeRoles.superAdmin],
    sort: 0
  },
  children: [
    {
      path: '',
      name: 'Dashboard',
      meta: {
        title: 'dashboard',
        icon: 'chart-dashboard',
        roles: [ITypeRoles.systemAdmin, ITypeRoles.superAdmin],
        nobg: true,
        nocache: true
      },
      component: () => import('@/modules/dashboard/index.vue')
    }
  ]
};

export default dashboard;
