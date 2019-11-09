import Layout from '@/layouts/index.vue';
import { RouteConfig } from 'vue-router';

const components: RouteConfig = {
  path: '/components',
  component: Layout,
  redirect: '/components/count-to',
  meta: {
    title: 'components',
    icon: 'thing-component',
    sort: 4,
    alwaysShow: true
  },
  children: [
    {
      path: 'count-to',
      name: 'CountTo',
      meta: { title: 'countTo', icon: 'action-count' },
      component: () => import('@/modules/components/count-to/index.vue')
    },
    {
      path: 'ck-editor',
      name: 'CKEditor',
      meta: { title: 'ckEditor', icon: 'thing-editor-tinymce' },
      component: () => import('@/modules/components/ckeditor/index.vue')
    },
    {
      path: 'painted-face',
      name: 'PaintedFace',
      meta: { title: 'paintedFace', icon: 'action-history' },
      component: () => import('@/modules/components/painted-face/index.vue')
    },
    {
      path: 'watermark',
      name: 'Watermark',
      meta: { title: 'Watermark', icon: 'mark-watermark' },
      component: () => import('@/modules/components/watermark/index.vue')
    }
  ]
};

export default components;
