import Layout from '@/layouts/index.vue';
import { RouteConfig } from 'vue-router';
import { ITypeRoles } from '@/store/modules/user';

const permissions: RouteConfig = {
  path: '/permission',
  redirect: '/permission/visitor',
  component: Layout,
  name: 'Permission',
  meta: {
    title: 'permission',
    icon: 'mark-vip',
    roles: [
      ITypeRoles.systemAdmin,
      ITypeRoles.superAdmin,
      ITypeRoles.accessManager,
      ITypeRoles.userManager,
      ITypeRoles.proManager,
      ITypeRoles.auditor,
      ITypeRoles.editor,
      ITypeRoles.visitor,
    ],
    alwaysShow: true,
    sort: 2,
  },
  children: [
    {
      path: 'admin',
      name: 'PermissionAdmin',
      meta: {
        title: 'Admins',
        roles: [ITypeRoles.systemAdmin, ITypeRoles.superAdmin],
      },
      component: () => import('@/modules/permission/index.vue'),
    },
    {
      path: 'auditor',
      name: 'PermissionAuditor',
      meta: {
        title: 'Managers',
        roles: [ITypeRoles.accessManager, ITypeRoles.userManager, ITypeRoles.proManager], // admin always has all permissions
      },
      component: () => import('@/modules/permission/index.vue'),
    },
    {
      path: 'editor',
      name: 'PermissionEditor',
      meta: {
        title: 'Auditor & Editor',
        roles: [ITypeRoles.auditor, ITypeRoles.editor], // admin always has all permissions
      },
      component: () => import('@/modules/permission/index.vue'),
    },
    {
      path: 'visitor',
      name: 'PermissionVisitor',
      meta: {
        title: 'Visitor',
        roles: [ITypeRoles.visitor], // admin always has all permissions
      },
      component: () => import('@/modules/permission/index.vue'),
    },
  ],
};

export default permissions;
