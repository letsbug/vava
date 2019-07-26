import Account from '@/apis/account'
import { Token } from '@/tools'
import { resetRouter } from '@/router'

const TOKEN_EXPIRE = process.env.NODE_ENV === 'development'
  ? 1 / 24 // for dev
  : 1 / 24 / 6 // By default, it is stored in the cookie for 10 minutes.

const user = {
  state: {
    id: '',
    username: '',
    name: '',
    sex: '',
    nick: '',
    avatar: '',
    phone: '',
    birthday: '',
    age: '',
    height: '',
    weight: '',
    introduction: '',
    roles: [],
    token: Token.get(),
    expire: 7
  },
  mutations: {
    USER_SET_TOKEN: (state, token) => {
      state.token = token
    },
    USER_SET_ACCOUNT: (state, username) => {
      state.username = username
    },
    USER_SET_NAME: (state, name) => {
      state.name = name
    },
    USER_SET_SEX: (state, sex) => {
      state.sex = sex
    },
    USER_SET_NICK: (state, nick) => {
      state.nick = nick
    },
    USER_SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    USER_SET_PHONE: (state, phone) => {
      state.phone = phone
    },
    USER_SET_BIRTHDAY: (state, birthday) => {
      state.birthday = birthday
    },
    USER_SET_AGE: (state, age) => {
      state.age = age
    },
    USER_SET_HEIGHT: (state, height) => {
      state.height = height
    },
    USER_SET_WEIGHT: (state, weight) => {
      state.weight = weight
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
        const token = res.data
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
        const { data } = res
        if (!data) {
          reject(new Error('Valid failed, please Login again.'))
        }

        const { roles } = data

        if (!roles) {
          reject(new Error('roles must be a non-null array!'))
        }

        commit('USER_SET_ROLES', roles)

        const {
          username, name, sex, nickname, avatar, introduction, phone, birthday, age, height, weight
        } = data

        commit('USER_SET_ACCOUNT', username)
        commit('USER_SET_NAME', name)
        commit('USER_SET_SEX', sex)
        commit('USER_SET_NICK', nickname)
        commit('USER_SET_AVATAR', avatar)
        commit('USER_SET_PHONE', phone)
        commit('USER_SET_BIRTHDAY', birthday)
        commit('USER_SET_AGE', age)
        commit('USER_SET_HEIGHT', height)
        commit('USER_SET_WEIGHT', weight)
        commit('USER_SET_INTRO', introduction)

        resolve(roles)
      }).catch(err => {
        reject(err)
      })
    }),

    user_logout: ({ commit, state }) => new Promise((resolve, reject) => {
      Account.logout(state.token).then(() => {
        commit('USER_SET_TOKEN', '')
        commit('USER_SET_ROLES', [])

        Token.remove()
        resetRouter()
        resolve()
      }).catch(err => {
        reject(err)
      })
    }),

    // Only remove the token on the client.
    user_token_clear: ({ commit }) => new Promise((resolve) => {
      commit('USER_SET_TOKEN', '')
      commit('USER_SET_ROLES', [])

      Token.remove()
      resolve()
    }),

    // Remove all user info, and refresh current router, and add the target user info in router helper.
    user_switch: ({ commit, dispatch }, token) => new Promise(resolve => {
      commit('USER_SET_TOKEN', token)
      Token.set(token, TOKEN_EXPIRE)
      commit('USER_SET_ROLES', [])
      commit('USER_SET_ACCOUNT', '')

      resetRouter()
      dispatch('tabs_empty')
      resolve()
    })
  }
}

export default user
