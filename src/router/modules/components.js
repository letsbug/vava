import Layout from '@/layouts'

export default {
  path: '/components',
  component: Layout,
  redirect: '/components/rich-editor',
  meta: {
    title: 'components',
    icon: 'thing-component'
  },
  alwaysShow: true,
  children: [{
    path: 'rich-editor',
    name: 'RichEditor',
    meta: {
      title: 'richEditor',
      icon: 'thing-editor-ckeditor'
    },
    component: () => import('@/modules/components/rich-editor')
  }]
}
