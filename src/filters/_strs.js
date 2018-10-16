/**
 * @param str
 * @returns {string}
 * @constructor
 */
export function lowercase(str) {
  return str.toLowerCase()
}

/**
 * @param str
 * @returns {string}
 * @constructor
 */
export function uppercase(str) {
  return str.toUpperCase()
}

/**
 * @param str
 * @returns {string}
 */
export function capitalize(str) {
  const words = str.split(' ')
  for (const [i, word] of words.entries()) {
    words[i] = word.charAt(0).toUpperCase() + word.slice(1)
  }
  return words.join(' ')
}
