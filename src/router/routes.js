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
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: '/editor',
    meta: { title: 'TextEditor', icon: 'editor' },
    children: [
      {
        path: 'tinymce',
        name: 'TinymceEditor',
        component: () => import('@/views/TextEditor/TinymceEditor'),
        meta: { title: 'Tinymce' }
      },
      {
        path: 'quill',
        name: 'QuillEditor',
        component: () => import('@/views/TextEditor/QuillEditor'),
        meta: { title: 'Quill' }
      },
      {
        path: 'ckeditor',
        name: 'CKEditor',
        component: () => import('@/views/TextEditor/CKEditor'),
        meta: { title: 'CKEditor' }
      }
    ]
  }
]

export const asyncRouterMap = [
  {
    path: '/settings',
    component: Layout,
    children: [{
      path: 'index',
      name: 'settings',
      component: () => import('@/views/settings/Settings'),
      meta: { title: 'Settings', icon: 'settings', nocache: true }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]
