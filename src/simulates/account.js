import { Urls } from '@/tools'

const userMap = {
  admin: {
    roles: ['admin', 'editor'],
    token: 'admin',
    code: '',
    username: 'admin',
    intro: 'I\'m super manager',
    avatar: require('@/assets/images/avatar-admin.png'),
    status: 1
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    code: '',
    username: 'editor',
    intro: 'I\'m a editor',
    avatar: require('@/assets/images/avatar-editor.jpg'),
    status: 1
  }
}

export default {
  login: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  info: config => {
    const { token } = Urls.parse(config.url)
    return userMap[token] || undefined
  },
  logout: () => 'success'
}
