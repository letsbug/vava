import Mock from 'mockjs'
import { Urls } from '@/tools'
import avatars from './avatars'

const userList = []
const total = 10

const permission_list = ['admin', 'assigner', 'auditor', 'editor', 'visitor']
// export const role_list = ['administrator', 'auditor', 'editor']

const generateRole = index => {
  return permission_list.filter((v, i) => index <= i)
}

const randomRole = () => {
  const rd = Math.floor(Math.random() * permission_list.length)
  return generateRole(rd)
}

const random = () => {
  const username = '@first'
  const avatar = avatars[Math.floor(Math.random() * avatars.length)]
  return Mock.mock({
    roles: randomRole(),
    token: username,
    code: '@id',
    username,
    intro: 'My name is ' + username,
    avatar: require(`@/assets/images/avatars/${avatar}`),
    status: 1
  })
}

permission_list.forEach((v, i) => {
  const token = permission_list[i]
  const rd = Mock.mock({
    roles: generateRole(i),
    token: token,
    code: '@id',
    username: token,
    intro: 'I\'m a ' + token,
    avatar: require(`@/assets/images/avatar-${token}.gif`),
    status: 1
  })
  userList.push(rd)
})

for (let i = 0; i < total; i++) {
  const rd = random()
  userList.push(rd)
}

export default {
  login: config => {
    const { username } = JSON.parse(config.body)
    return userList.find(v => v.username === username ? v : null)
  },
  info: config => {
    const { token } = Urls.parse(config.url)
    return userList.find(v => v.token === token ? v : null)
  },
  update: config => {
    const data = JSON.parse(config.body)
    console.log(data)
    return 'success'
  },
  logout: () => 'success',
  list: () => userList,
  auditors: () => userList.filter(v => ~v.roles.indexOf('audit'))
}
