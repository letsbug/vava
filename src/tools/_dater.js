/**
 * Format Date & Time format
 * @param date {number|string|Date} 毫秒型日期或者Date
 * @param fmt {string|undefined} like 'yyyy.MM.dd hh:mm:ss'
 * @returns {string|null|undefined}
 */
export const dateFormat = (date, fmt = 'yyyy.MM.dd') => {
  if (!date) return 'Null'

  if (typeof date === 'string') {
    // If the date param format is 'yyyy-MM-dd', With '-' intervals. It's not work in IOS12.
    date = date.replace(/-/g, '/')
  }

  try {
    date = new Date(date)
  } catch (e) {
    return 'Wrong date format'
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, date.getFullYear().toString().substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  Object.keys(o).forEach(k => {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
        ? str
        : `00${str}`.substr(str.length))
    }
  })
  return fmt
}

export const dateAgo = date => {
  if (!date) return 'Null'

  if (Object.prototype.toString.call(date) !== '[object Date]') {
    try {
      date = new Date(date)
    } catch (e) {
      return 'Wrong date convert'
    }
  }

  const diff = (new Date() - date) / 1000

  if (diff < 60) return 'just now'
  else if (diff < 3600) return Math.floor(diff / 60) + ' minutes ago'
  else if (diff < 3600 * 24) return Math.floor(diff / 3600) + ' hours ago'
  else if (diff < 3600 * 24 * 30) return Math.floor(diff / 3600 / 24) + ' days ago'
  else if (diff < 3600 * 24 * 30 * 12) return Math.floor(diff / 3600 / 24 / 30) + ' months ago'
  else return Math.floor(diff / 3600 / 24 / 30 / 12) + ' years ago'
}

export default {
  format: dateFormat,
  ago: dateAgo
}
