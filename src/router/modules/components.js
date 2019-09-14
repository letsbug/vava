import Layout from '@/layouts'

export default {
  path: '/components',
  component: Layout,
  redirect: '/components/count-to',
  meta: {
    title: 'components',
    icon: 'thing-component'
  },
  sort: 4,
  alwaysShow: true,
  children: [
    {
      path: 'count-to',
      name: 'CountTo',
      meta: {
        title: 'countTo',
        icon: 'action-count'
      },
      component: () => import('@/modules/components/count-to')
    },
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
      path: 'painted-face',
      name: 'PaintedFace',
      meta: {
        title: 'paintedFace',
        icon: 'action-history'
      },
      component: () => import('@/modules/components/painted-face')
    }
  ]
}
