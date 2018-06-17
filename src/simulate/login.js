/**
 * login.
 * @author: gzb
 * @date: 2018-06-17 16:01
 */

import { paramToObj } from '@/utilities'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: 'I\'m super manager',
    avatar: '/static/icon-avatar512x512.jpg',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: 'I\'m a editor',
    avatar: '/static/icon-avatar512x512.jpg',
    name: 'Normal Editor'
  }
}

export default {
  login: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  information: config => {
    const { token } = paramToObj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success'
}
