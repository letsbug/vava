/**
 * index.
 * @author: gzb
 * @date: 2018-06-17 16:00
 */

/**
 * Parse the parameter column from the url link
 * @param url
 * @returns {{}}
 */
export function paramToObj(url) {
  const search = url.split('?')[1]
  return search ? JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    : {}
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

/**
 * Format Date & Time format
 * @param date
 * @param fmt   like 'yyyy-MM-dd hh:mm:ss'
 * @returns {*}
 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

/**
 * Returns the book of family names.
 * @type {Array}
 */
export const firstNameBook = [
  '赵', '钱', '孙', '李', '周', '吴', '郑', '王',
  '冯', '陈', '诸', '卫', '蒋', '沈', '韩', '杨',
  '朱', '秦', '尤', '许', '何', '吕', '施', '张',
  '孔', '曹', '严', '华', '金', '魏', '陶', '姜',
  '戚', '谢', '邹', '喻', '柏', '水', '窦', '章',
  '云', '苏', '潘', '葛', '奚', '范', '彭', '郎'
]

export { default as Regulars } from './_regulars'
export { default as Validators } from './_validators'
export { default as Token } from './_token'
