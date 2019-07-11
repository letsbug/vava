import Mock from 'mockjs'
import { roles } from './roles'
import { parseURL } from '../src/tools/urls'

const userList = []
const Preset = ['Charles', 'Linda', 'Nancy', 'Karen', 'Jennifer']
const avatars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

const generateRole = index => {
  return roles.filter((v, i) => index <= i)
}

const randomAvatar = () => {
  const index = Math.floor(Math.random() * avatars.length)
  const path = `/static/images/avatars/${avatars[index]}.gif`

  avatars.splice(index, 1)
  return path
}

roles.forEach((v, i) => {
  const token = roles[i]
  const rd = Mock.mock({
    roles: generateRole(i),
    token: token,
    code: '@id',
    username: token,
    intro: 'I\'m a ' + token,
    avatar: randomAvatar(),
    status: 1
  })
  userList.push(rd)
})

Preset.forEach((v, i) => {
  const rd = Mock.mock({
    roles: generateRole(i),
    token: v,
    code: '@id',
    username: v,
    intro: 'My name is ' + v,
    avatar: randomAvatar,
    status: 1
  })
  userList.push(rd)
})

userList.sort((a, b) => a.roles.length > b.roles.length ? -1 : 1)

export function editors() {
  return userList.filter(v => v.roles[0] === 'editor')
}
export function auditors() {
  return userList.filter(v => v.roles[0] === 'auditor')
}

export default [
  {
    url: '/account/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const user = userList.find(v => v.username === username ? v : null)

      if (!user) {
        return {
          status: 5001,
          success: false,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        status: 2000,
        success: true,
        message: 'success',
        data: { token: user.token }
      }
    }
  },
  {
    url: '/account/info',
    type: 'get',
    response: config => {
      const { token } = parseURL(config.url)
      const user = userList.find(v => v.token === token ? v : null)

      if (!user) {
        return {
          status: 5002,
          success: false,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        status: 2000,
        success: true,
        message: 'success',
        data: user
      }
    }
  },
  {
    url: '/account/update',
    type: 'get',
    response: config => {
      const data = JSON.parse(config.body)
      console.log('user update parameters: ', data)
      return {
        status: 2000,
        success: true,
        message: 'success'
      }
    }
  },
  {
    url: '/account/logout',
    type: 'post',
    response: () => {
      return {
        status: 2000,
        success: true,
        message: 'success'
      }
    }
  },
  {
    url: '/account/list',
    type: 'get',
    response: () => {
      return {
        status: 2000,
        success: true,
        message: 'success',
        data: userList
      }
    }
  },
  {
    url: '/account/auditors',
    type: 'post',
    response: () => {
      return {
        status: 2000,
        success: true,
        message: 'success',
        data: auditors()
      }
    }
  },
  {
    url: '/account/editors',
    type: 'post',
    response: () => {
      return {
        status: 2000,
        success: true,
        message: 'success',
        data: editors()
      }
    }
  }
]
