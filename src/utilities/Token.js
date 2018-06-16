/**
 * Token.
 * @author: gzb
 * @date: 2018-06-17 02:39
 */

import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, expires) {
  return expires ? Cookies.set(TokenKey, token, { expires: expires })
    : Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
