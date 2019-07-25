import Layout from '@/layouts'

export default {
  path: '/permission',
  redirect: '/permission/visitor',
  component: Layout,
  name: 'Permission',
  meta: {
    title: 'permission',
    icon: 'mark-vip',
    roles: ['SuperAdmin', 'Assigner', 'Auditor', 'Editor', 'Visitor']
  },
  sort: 2,
  alwaysShow: true,
  children: [
    {
      path: 'admin',
      name: 'PermissionAdmin',
      meta: {
        title: 'Admin & Assigner',
        roles: ['SuperAdmin', 'Assigner']
      },
      component: () => import('@/modules/permission')
    },
    {
      path: 'auditor',
      name: 'PermissionAuditor',
      meta: {
        title: 'Auditor',
        roles: ['Auditor'] // admin always has all permissions
      },
      component: () => import('@/modules/permission')
    },
    {
      path: 'editor',
      name: 'PermissionEditor',
      meta: {
        title: 'Editor',
        roles: ['Editor'] // admin always has all permissions
      },
      component: () => import('@/modules/permission')
    },
    {
      path: 'visitor',
      name: 'PermissionVisitor',
      meta: {
        title: 'Visitor',
        roles: ['Visitor'] // admin always has all permissions
      },
      component: () => import('@/modules/permission')
    }
  ]
}
