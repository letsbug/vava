/**
 * meta
 * @author: ggboom.
 * @date: 2018-09-15 17:13
 */

module.exports = {
  /*
   * 可以让布局在移动浏览器上显示的更好。
   * @param width viewport 宽度
   * @param initial-scale 初始缩放比例
   * @param minimum-scale 允许的最小缩放比例
   * @param maximum-scale 允许的最大缩放比例
   * @param user-scalable 是否允许用户缩放(yes/no)
   * @param shrink-to-fit 禁止IOS9强制缩放以适应屏幕的功能
   */
  'viewport': 'width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no, shrink-to-fit=no',

  /*
   * 设置国产双核浏览器使用什么内核渲染
   * @param webkit 极速核
   * @param ie-stand ie兼容内核
   * @param ie-comp ie标准内核
   */
  'renderer': 'webkit',

  'force-rendering': 'webkit',

  /*
   * 禁止/开启 页面数字识自动识别
   * @param telephone 把数字转化为拨号链接 (no / yes - default)
   * @param email 把文本识别为邮箱链接 (no / yes - default)
   * @param address 点击地址直接跳转至地图的功能 (no / yes -default)
   */
  'format-detection': 'telephone=no',

  /*
   * 定义网页搜索引擎索引方式
   * @param follow 跟踪链接并分析目标网页。这是默认行为，并且可忽略。
   * @param index 将网页编入索引。这是默认行为，并且可忽略。
   * @param noodp 不使用 Open Directory Project 来创建内容描述。
   * @param noydir 不使用 Yahoo Directory 来创建内容描述。
   * @param noarchive 不允许搜索引擎显示内容的缓存版本。
   * @param cache 允许搜索引擎显示内容的缓存版本。
   * @param nocache 不允许搜索引擎显示内容的缓存版本。
   */
  'robots': 'index, follow',

  'author': 'Letsbug, ggboom, 724939995@qq.com, xman724939995@gmail.com',

  'keywords': 'vue, vue-cli, admin, manage, template, mini, vue-admin, admin-template, vue-admin-template, vava, vava-admin, vava-minimal',

  'description': 'A minimal admin template based on vue@2.5.2 and element-ui@2.4.5.',

  // 关于移动端SEO优化

  // IOS

  /*
   * 添加到主屏后的标题（iOS 6 新增）
   */
  'apple-mobile-web-app-title': 'vava-mini',

  /*
   * 是否启用 WebApp 全屏模式 (yes/no)
   */
  'apple-mobile-web-app-capable': 'yes',

  /*
   * 设置状态栏的背景颜色
   * 只有在 “apple-mobile-web-app-capable” content=”yes” 时生效
   * 如果设置为 default 或 black ,网页内容从状态栏底部开始。 如果设置为 black-translucent ,网页内容充满整个屏幕，顶部会被状态栏遮挡。
   * @param default 默认值
   * @param black 状态栏背景是黑色
   * @param black-translucent 状态栏背景是黑色半透明。
   */
  'apple-mobile-web-app-status-bar-style': 'black-translucent',

  // Android

  'theme-color': '#d90378'
}
