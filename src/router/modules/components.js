import Layout from '@/layouts'

export default {
  path: '/components',
  component: Layout,
  redirect: '/components/tinymce',
  meta: {
    title: 'components',
    icon: 'thing-component'
  },
  alwaysShow: true,
  children: [{
    path: 'tinymce',
    name: 'Tinymce',
    meta: {
      title: 'tinymce',
      icon: 'thing-editor-tinymce'
    },
    component: () => import('@/modules/components/tinymce')
  }]
}
