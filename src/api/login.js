/**
 * login.
 * @author: gzb
 * @date: 2018-06-17 15:00
 */

import { service } from './request'

export function Login(username, password) {
  const data = { username, password }
  return service({
    url: '/login/login', method: 'post', data
  })
}

export function Logout() {
  return service({
    url: '/login/logout', method: 'post'
  })
}

export function Information(token) {
  return service({
    url: 'user/info', method: 'get', params: { token }
  })
}
