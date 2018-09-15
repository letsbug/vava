/**
 * Format Date & Time format
 * @param date {number|Date} 毫秒型日期或者Date
 * @param fmt {string} like 'yyyy.MM.dd hh:mm:ss'
 * @returns {string}
 */
const format = (date, fmt) => {
  if (!date) return undefined

  // Convert the millisecond Date to Date
  if (typeof (date - 0) === 'number') date = new Date(date - 0)

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
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
    }
  }
  return fmt
}

export default {
  format
}
