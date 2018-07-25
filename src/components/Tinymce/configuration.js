/**
 * configuration (Create by ggboom)
 * @author: ggboom
 * @datetime: 2018/7/19 19:58
 */

import plugin_list from './plugin_list'
import external_plugins from './external_plugins'

const plugins = plugin_list.join(' ')

export const document = {
  // Enable relative urls
  relative_urls: false,

  // 指定文档中所有相对URL的基本URL
  // document_base_url: process.env.TINYMCE_RES,

  // Tinymce stylesheets
  skin_url: './static/tinymce/skins/lightgray',
  theme: 'modern',

  // Language settings
  language: 'zh_CN',
  language_url: './static/tinymce/langs/zh_CN.js',

  // 允许链接和图像
  allow_script_urls: true,

  // Document default height
  height: '300',

  // About tinymce toolbar buttons
  toolbar: 'restoredraft | ' +
    'undo redo | ' +
    'styleselect fontselect fontsizeselect | ' +
    'bold italic | ' +
    'forecolor backcolor | ' +
    'numlist bullist | ' +
    'hr insertdatetime link unlink image media anchor | ' +
    'emoticons | ' +
    'outdent indent | ' +
    'fullscreen',

  // The plug-in for tinymce to be imported.
  // plugins: 'textcolor lists advlist hr link image imagetools media emoticons fullscreen autosave',
  plugins: plugins,

  // The plug-in urls
  external_plugins: external_plugins
}
