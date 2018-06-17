/**
 * userInfo.
 * @author: gzb
 * @date: 2018-06-17 03:20
 */

import { Login, Logout, Information } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utilities/Token'

const user = {
  state: {
    code: '',
    status: '',
    token: getToken(),
    expire: 7,
    username: '',
    avatar: '',
    roles: []
  },
  mutations: {
    USER_SET_CODE: (state, code) => { state.code = code },
    USER_SET_STAT: (state, status) => { state.status = status },
    USER_SET_TOKEN: (state, token) => { state.token = token },
    USER_SET_NAME: (state, name) => { state.username = name },
    USER_SET_AVATAR: (state, avatar) => { state.avatar = avatar },
    USER_SET_ROLS: (state, rols) => { state.roles = rols }
  },
  actions: {
    user_login: ({ commit, state }, userInfo) => new Promise((resolve, reject) => {
      Login(userInfo.username.trim(), userInfo.password).then(response => {
        commit('USER_SET_TOKEN', response.data.token)
        commit('USER_SET_NAME', response.data.username)
        commit('USER_SET_CODE', response.data.code)
        commit('USER_SET_STAT', response.data.status)
        commit('USER_SET_AVATAR', response.data.avatar)
        commit('USER_SET_ROLS', response.data.roles)
        setToken(response.data.token, userInfo.remember ? state.expire : null)
        resolve()
      }).catch(err => { reject(err) })
    }),
    user_logout: ({ commit, state }) => new Promise((resolve, reject) => {
      Logout(state.token).then(() => {
        commit('USER_SET_TOKEN', '')
        commit('USER_SET_NAME', '')
        commit('USER_SET_CODE', '')
        commit('USER_SET_STAT', '')
        commit('USER_SET_AVATAR', '')
        commit('USER_SET_ROLS', [])
        removeToken()
        resolve()
      }).catch(err => { reject(err) })
    }),
    user_info: ({ commit, state }) => new Promise((resolve, reject) => {
      Information(state.token).then(response => {
        if (!response.data) reject(new ErrorEvent('error'))

        const data = response.data
        if (data.roles && data.roles.length > 0) commit('USER_SET_ROLS', data.roles)
        else reject(new ErrorEvent('userInfo: roles must be a non-null array !'))

        commit('USER_SET_NAME', data.username)
        commit('USER_SET_CODE', data.code)
        commit('USER_SET_AVATAR', data.avatar)
        resolve(response)
      }).catch(err => { reject(err) })
    })
  }
}

export default user
