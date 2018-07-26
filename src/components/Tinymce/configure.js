/**
 * configuration (Create by ggboom)
 * @author: ggboom
 * @datetime: 2018/7/19 19:58
 */

import toobar from './toobar'
import plugins from './plugins'
import plugin_urls from './plugin_urls'

export const configure = {
  // Enable relative urls
  relative_urls: false,

  // 指定文档中所有相对URL的基本URL
  // document_base_url: process.env.TINYMCE_RES,
  // document_base_url: 'http://127.0.0.1:9999/',

  // Tinymce stylesheets
  skin_url: './static/tinymce/skins/lightgray',
  theme: 'modern',

  // Language settings
  language: 'zh_CN',
  language_url: './static/tinymce/langs/zh_CN.js',

  // 允许链接和图像
  allow_script_urls: true,

  object_resizing: false,
  end_container_on_empty_block: true,
  code_dialog_height: 450,
  code_dialog_width: 800,
  link_title: false,
  powerpaste_word_import: 'clean',

  // How to open a hyperlink in documents
  default_link_target: '_blank',

  // About tinymce toolbar buttons
  toolbar: toobar,

  // The plug-in for tinymce to be imported.
  // plugins: 'textcolor lists advlist hr link image imagetools media emoticons fullscreen autosave',
  plugins: plugins,

  // The plug-in urls
  external_plugins: plugin_urls,

  // About mobile options
  mobile: {
    theme: 'mobile'
  }
}

export default configure
