import Layout from '@/layouts'

export default {
  path: '/permission',
  redirect: '/permission/page',
  component: Layout,
  name: 'Permission',
  meta: {
    title: 'permission',
    icon: 'mark-vip',
    roles: ['admin', 'assigner', 'auditor', 'editor', 'visitor']
  },
  alwaysShow: true,
  children: [
    {
      path: 'admin',
      name: 'PermissionAdmin',
      meta: {
        title: 'Admin & Assigner',
        roles: ['admin', 'assigner']
      },
      component: () => import('@/modules/permission')
    },
    {
      path: 'auditor',
      name: 'PermissionAuditor',
      meta: {
        title: 'Auditor',
        roles: ['auditor'] // admin always has all permissions
      },
      component: () => import('@/modules/permission')
    },
    {
      path: 'editor',
      name: 'PermissionEditor',
      meta: {
        title: 'Editor',
        roles: ['editor'] // admin always has all permissions
      },
      component: () => import('@/modules/permission')
    },
    {
      path: 'visitor',
      name: 'PermissionVisitor',
      meta: {
        title: 'Visitor',
        roles: ['visitor'] // admin always has all permissions
      },
      component: () => import('@/modules/permission')
    }
  ]
}
