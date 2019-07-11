import Account from '@/apis/account'
import { Token } from '@/tools'

const TOKEN_EXPIRE = process.env.NODE_ENV === 'development'
  ? 1 / 24 // for dev
  : 1 / 24 / 6 // By default, it is stored in the cookie for 10 minutes.

const user = {
  state: {
    code: '',
    username: '',
    avatar: '',
    introduction: '',
    roles: [],
    status: '',
    token: Token.get(),
    expire: 7
  },
  mutations: {
    USER_SET_CODE: (state, code) => {
      state.code = code
    },
    USER_SET_STATUS: (state, status) => {
      state.status = status
    },
    USER_SET_TOKEN: (state, token) => {
      state.token = token
    },
    USER_SET_NAME: (state, name) => {
      state.username = name
    },
    USER_SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    USER_SET_INTRO: (state, intro) => {
      state.introduction = intro
    },
    USER_SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    user_login: ({ commit, state }, userInfo) => new Promise((resolve, reject) => {
      Account.login(userInfo.username.trim(), userInfo.password).then(res => {
        const { token } = res.data.data
        commit('USER_SET_TOKEN', token)

        const expire = userInfo.remember ? state.expire : TOKEN_EXPIRE
        Token.set(token, expire)
        resolve()
      }).catch(err => {
        reject(err)
      })
    }),
    user_info: ({ commit, state }) => new Promise((resolve, reject) => {
      Account.info(state.token).then(res => {
        const { data } = res.data
        if (!data) reject(new Error('Valid failed, please Login again.'))

        const { roles, username, code, status, avatar, intro } = data
        if (!roles || data.roles.length < 1) {
          reject(new Error('roles must be a non-null array!'))
        }

        commit('USER_SET_ROLES', roles)
        commit('USER_SET_NAME', username)
        commit('USER_SET_CODE', code)
        commit('USER_SET_STATUS', status)
        commit('USER_SET_AVATAR', avatar)
        commit('USER_SET_INTRO', intro)
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    }),
    user_logout: ({ commit, state }) => new Promise((resolve, reject) => {
      Account.logout(state.token).then(res => {
        commit('USER_SET_TOKEN', '')
        commit('USER_SET_ROLES', [])
        commit('USER_SET_NAME', '')
        commit('USER_SET_CODE', '')
        commit('USER_SET_STATUS', '')
        commit('USER_SET_AVATAR', '')
        commit('USER_SET_INTRO', '')
        Token.remove()
        resolve()
      }).catch(err => {
        reject(err)
      })
    }),
    // Only remove the token on the client.
    user_exit: ({ commit, state }) => new Promise((resolve, reject) => {
      commit('USER_SET_TOKEN', '')
      Token.remove()
      resolve()
    }),
    // Remove all user info, and refresh current router, and add the target user info in router helper.
    user_switch: ({ commit, dispatch }, token) => new Promise(resolve => {
      commit('USER_SET_TOKEN', token)
      Token.set(token, TOKEN_EXPIRE)
      commit('USER_SET_ROLES', [])
      commit('USER_SET_NAME', '')
      commit('USER_SET_CODE', '')
      commit('USER_SET_STATUS', '')
      commit('USER_SET_AVATAR', '')
      commit('USER_SET_INTRO', '')
      resolve()
    })
  }
}

export default user
