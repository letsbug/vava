import Layout from '@/layouts/index.vue';
import { RouteConfig } from 'vue-router';

const permissions: RouteConfig = {
  path: '/permission',
  redirect: '/permission/visitor',
  component: Layout,
  name: 'Permission',
  meta: {
    title: 'permission',
    icon: 'mark-vip',
    roles: ['SuperAdmin', 'Assigner', 'Auditor', 'Editor', 'Visitor'],
    alwaysShow: true,
    sort: 2
  },
  children: [
    {
      path: 'admin',
      name: 'PermissionAdmin',
      meta: {
        title: 'Admin & Assigner',
        roles: ['SuperAdmin', 'Assigner']
      },
      component: () => import('@/modules/permission.vue')
    },
    {
      path: 'auditor',
      name: 'PermissionAuditor',
      meta: {
        title: 'Auditor',
        roles: ['Auditor'] // admin always has all permissions
      },
      component: () => import('@/modules/permission.vue')
    },
    {
      path: 'editor',
      name: 'PermissionEditor',
      meta: {
        title: 'Editor',
        roles: ['Editor'] // admin always has all permissions
      },
      component: () => import('@/modules/permission.vue')
    },
    {
      path: 'visitor',
      name: 'PermissionVisitor',
      meta: {
        title: 'Visitor',
        roles: ['Visitor'] // admin always has all permissions
      },
      component: () => import('@/modules/permission.vue')
    }
  ]
};

export default permissions;
