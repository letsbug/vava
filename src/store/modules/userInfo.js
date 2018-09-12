/**
 * userInfo.
 * @author: gzb
 * @date: 2018-06-17 03:20
 */

import { Login, Logout, Information } from '@/api/login'
import Token from '@/utilities/Token'

const user = {
  state: {
    code: '',
    status: '',
    token: Token.get(),
    expire: 7,
    username: '',
    avatar: '',
    introduction: '',
    roles: []
  },
  mutations: {
    USER_SET_CODE: (state, code) => { state.code = code },
    USER_SET_STAT: (state, status) => { state.status = status },
    USER_SET_TOKEN: (state, token) => { state.token = token },
    USER_SET_NAME: (state, name) => { state.username = name },
    USER_SET_AVATAR: (state, avatar) => { state.avatar = avatar },
    USER_SET_INTR: (state, introduction) => { state.introduction = introduction },
    USER_SET_ROLS: (state, rols) => { state.roles = rols }
  },
  actions: {
    user_login: ({ commit, state }, userInfo) => new Promise((resolve, reject) => {
      Login(userInfo.username.trim(), userInfo.password).then(response => {
        // When the user login successfully, only add user token.
        // Because the router helper needed to determine the user permissions and information,
        // thus for different users permissions to access the routing dynamically add user information at this time should be only a token.
        // detail in 'src/router/helper.js(line 27)'
        commit('USER_SET_TOKEN', response.data.token)
        Token.set(response.data.token, userInfo.remember ? state.expire : null)
        resolve()
      }).catch(err => { reject(err) })
    }),
    user_info: ({ commit, state }) => new Promise((resolve, reject) => {
      Information(state.token).then(response => {
        if (!response.data) reject(new Error('error'))

        const data = response.data
        if (data.roles && data.roles.length > 0) commit('USER_SET_ROLS', data.roles)
        else reject(new Error('userInfo: roles must be a non-null array !'))

        commit('USER_SET_NAME', data.username)
        commit('USER_SET_CODE', data.code)
        commit('USER_SET_STAT', response.data.status)
        commit('USER_SET_AVATAR', data.avatar)
        commit('USER_SET_INTR', data.introduction)
        resolve(response)
      }).catch(err => { reject(err) })
    }),
    user_logout: ({ commit, state }) => new Promise((resolve, reject) => {
      Logout(state.token).then(() => {
        commit('USER_SET_TOKEN', '')
        commit('USER_SET_NAME', '')
        commit('USER_SET_CODE', '')
        commit('USER_SET_STAT', '')
        commit('USER_SET_AVATAR', '')
        commit('USER_SET_INTR', '')
        commit('USER_SET_ROLS', [])
        Token.remove()
        resolve()
      }).catch(err => { reject(err) })
    }),
    // 前端登出
    user_logout_fed: ({ commit }) => new Promise(resolve => {
      commit('USER_SET_TOKEN', '')
      Token.remove()
      resolve()
    })
  }
}

export default user
