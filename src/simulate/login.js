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
    avatar: './static/avatar.png',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: 'I\'m a editor',
    avatar: './static/avatar.png',
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
