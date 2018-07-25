/**
 * plugin_list (Create by ggboom)
 * @author: ggboom
 * @datetime: 2018/7/25 10:43
 */

import plugin_list from './plugin_list'

const externals = {}

const prefix = (process.env.NODE_ENV === 'development' ? '/static' : '..') + '/tinymce/plugins/'
const suffix = '/plugin.js'

plugin_list.forEach((n, i) => {
  externals[n] = prefix + n + suffix
})

export default externals
