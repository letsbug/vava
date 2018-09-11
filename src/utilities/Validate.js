/**
 * Validate.
 * @author: gzb
 * @date: 2018-06-17 02:40
 */

/**
 * 用户名
 * @param str
 * @returns {boolean}
 */
export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
