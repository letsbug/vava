//
// Webstorm 配置文件，让编辑器识别 "@" 符号为 "/src" 的别名。
// 对应设置应在:
//
// File ->
// Settings ->
// Languages & Frameworks ->
// Javascript ->
// Webpack ->
// Webpack configuration file:
//
// 指定为此文件
//

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  }
}
