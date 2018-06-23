import Layout from '@/layouts/Layout'

/**
 * noCache: Marks whether the route is allowed to be cached so that the DOM is repeatedly rendered when routing is frequently switched.
 *          true - not allow
 * hidden:  Marks whether the route is visible and displayed when the template is rendered.
 *          true - hide
 * @type {Route[]}
 */
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/LoginIndex'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPages/error404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/Dashboard'),
      meta: { title: 'Dashboard', icon: 'home', nocache: true }
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: '/guide',
    children: [{
      path: 'guide',
      name: 'guide',
      component: () => import('@/views/guide/Guide'),
      meta: { title: 'Guide', icon: 'zhiyin', nocache: true }
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: '/avatar-upload',
    meta: { title: 'Component', icon: 'yingyong' },
    children: [
      {
        path: 'avatar-upload',
        name: 'avatar upload',
        component: () => import('@/views/component-demo/AvatarUpload'),
        meta: { title: 'AvatarUpload', nocache: true }
      },
      {
        path: 'dropzone',
        name: 'dropzone',
        component: () => import('@/views/component-demo/DropZone'),
        meta: { title: 'Dropzone', nocache: true }
      },
      {
        path: 'editor',
        name: 'editor',
        component: () => import('@/views/component-demo/DropZone'),
        meta: { title: 'Text Editor', nocache: true }
      }
    ]
  }
]
