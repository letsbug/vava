// About Date and time
export { dateFormat, dateAgo } from '@/tools/_dater'

// About character string
function getCapitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// 首字母大写
export function capitalize(str, firstWordOnly) {
  const words = str.split(' ')
  if (firstWordOnly) {
    words[0] = getCapitalize(words[0])
  } else {
    for (const [i, word] of words.entries()) {
      words[i] = getCapitalize(word)
    }
  }
  return words.join(' ')
}

// About Articles status
export function articleStatus(status) {
  const statusMap = {
    draft: 'info',
    committed: 'warning',
    failing: 'danger',
    auditing: 'primary',
    audited: 'success',
    deleted: 'info'
  }
  return statusMap[status]
}

// About page views
export function pageview(pv) {
  return pv > 20000 ? '2w+' : pv > 9999 ? '9999+' : pv
}

