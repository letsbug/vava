/**
 * configuration (Create by ggboom)
 * @author: ggboom
 * @datetime: 2018/7/19 19:58
 */

export const document = {
  // Enable relative urls
  relative_urls: true,

  // 指定文档中所有相对URL的基本URL
  document_base_url: process.env.TINYMCE_RES,

  // Tinymce stylesheets
  skin_url: '/static/tinymce/skins/lightgray',
  theme: 'modern',

  // Language settings
  language: 'zh_CN',
  language_url: '/static/tinymce/langs/zh_CN.js',

  // 允许链接和图像
  allow_script_urls: true,

  // Document default height
  height: '300',

  // About tinymce toolbar buttons
  'toolbar': 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent',

  // The plug-in for tinymce to be imported.
  'plugins': ''
}
