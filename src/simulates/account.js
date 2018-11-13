import Mock from 'mockjs'
import { Urls } from '@/tools'

const userMap = {
  admin: Mock.mock({
    roles: ['admin', 'editor', 'auditor'],
    token: 'admin',
    code: '@id',
    username: 'admin',
    intro: 'I\'m super manager',
    avatar: require('@/assets/images/avatar-admin.png'),
    status: 1
  }),
  editor: Mock.mock({
    roles: ['editor'],
    token: 'editor',
    code: '@id',
    username: 'editor',
    intro: 'I\'m a editor',
    avatar: require('@/assets/images/avatar-editor.jpg'),
    status: 1
  })
}

const userList = []
const total = 10
userList.push(userMap.admin)
userList.push(userMap.editor)

const random = () => {
  const username = '@first'
  return Mock.mock({
    roles: ['auditor'],
    token: username,
    code: '@id',
    username,
    intro: 'My name is ' + username,
    avatar: require('@/assets/images/avatar-admin.png'),
    status: 1
  })
}

for (let i = 0; i < total; i++) {
  userList.push(random())
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
  update: config => {
    const data = JSON.parse(config.body)
    console.log(data)
    return 'success'
  },
  logout: () => 'success',
  auditors: () => userList.filter(v => ~v.roles.indexOf('auditor'))
}
