import Mock from 'mockjs'
import Roles from './roles'
import avatars from './avatars'
import { Urls } from '@/tools'

const userList = []
const total = 10

const generateRole = index => {
  return Roles.filter((v, i) => index <= i)
}

const randomRole = () => {
  const rd = Math.floor(Math.random() * Roles.length)
  return generateRole(rd)
}

Roles.forEach((v, i) => {
  const token = Roles[i]
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
  const username = '@first'
  const avatar = avatars[Math.floor(Math.random() * avatars.length)]
  const rd = Mock.mock({
    roles: randomRole(),
    token: username,
    code: '@id',
    username,
    intro: 'My name is ' + username,
    avatar: require(`@/assets/images/avatars/${avatar}`),
    status: 1
  })
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
