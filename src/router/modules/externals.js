import Layout from '@/layouts'

export default {
  path: 'externals',
  component: Layout,
  sort: 11,
  children: [{
    path: 'https://google.com',
    meta: { title: 'externalLink', icon: 'thing-clip' }
  }]
}
