/**
 * plugins (Create by ggboom)
 * @author: ggboom
 * @datetime: 2018/7/25 10:43
 */

import plugins from './plugins'

const plugin_urls = {}

const prefix = (process.env.NODE_ENV === 'development' ? '/static' : '..') + '/tinymce/plugins/'
const suffix = '/plugin.js'

plugins.forEach((n, i) => {
  plugin_urls[n] = prefix + n + suffix
})

export default plugin_urls
