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
  children: [
    {
      path: 'rich-editor',
      name: 'RichEditor',
      meta: {
        title: 'richText',
        icon: 'thing-editor-tinymce'
      },
      component: () => import('@/modules/components/rich-editor')
    },
    {
      path: 'count-to',
      name: 'CountTo',
      meta: {
        title: 'countTo',
        icon: 'action-count'
      },
      component: () => import('@/modules/components/count-to')
    }
  ]
}
