// About Date and time
export { dateFormat, dateAgo } from '@/tools/_dater'

// About character string
function getCapitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
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

// Number short
export function numberShort(number) {
  return number >= 1000000 ? `${Math.floor(number / 1000000)}m`
    : number >= 1000 ? `${Math.floor(number / 1000)}k` : number
}
