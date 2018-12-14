import Layout from '@/layouts'

export default {
  path: '/components',
  component: Layout,
  redirect: '/components/ckeditor',
  meta: {
    title: 'components',
    icon: 'thing-component'
  },
  alwaysShow: true,
  children: [{
    path: 'ckeditor',
    name: 'CKEditor',
    meta: {
      title: 'ckeditor',
      icon: 'thing-editor-ckeditor'
    },
    component: () => import('@/modules/components/ckeditor')
  }]
}
