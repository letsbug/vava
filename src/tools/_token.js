/**
 * Token.
 * @author: gzb
 * @date: 2018-06-17 02:39
 */

import Cookies from 'js-cookie'

const TokenKey = 'User-Token'

/**
 * Returns token value
 * @returns {string}
 */
const get = () => {
  return Cookies.get(TokenKey)
}

/**
 * Set token
 * @param token   token value
 * @param expires token expires
 * @returns {void}
 */
const set = (token, expires) => {
  if (expires) Cookies.set(TokenKey, token, { expires })
  else Cookies.set(TokenKey, token)
}

/**
 * Remove token
 * @returns {void}
 */
const remove = () => {
  Cookies.remove(TokenKey)
}

export default {
  get, set, remove
}
