/**
 * login.
 * @author: gzb
 * @date: 2018-06-17 15:00
 */

import request from './request'

export function Login(username, password) {
  const data = { username, password }
  return request({
    url: '/login/login', method: 'post', data
  })
}

export function Logout() {
  return request({
    url: '/login/logout', method: 'post'
  })
}

export function Information(token) {
  return request({
    url: 'user/info', method: 'get', param: { token }
  })
}
