import NotificationVo from '@/vo/notification'
import Notification from '@/services/notification'

const notification = {
  state: {
    list: [NotificationVo],
    unread: true
  },
  mutations: {
    NOTIFICATION_HAS_UNREAD: (state, unread) => {
      state.unread = unread
    },
    NOTIFICATION_LIST: (state, list) => {
      state.list = list
    },
    NOTIFICATION_READ: (state, id) => {
      const target = state.list.find(v => v.id === id)
      console.log(target)
      state.list.find(v => {
        if (v.id === id) v['unread'] = false
      })
    },
    NOTIFICATION_READ_ALL: (state) => {
      for (const [v, i] of state.list) {
        console.log('Vuex store notifications iterator read all: ', v, i)
      }
    }
  },
  actions: {
    notification_has_unread: ({ commit, state }) => {
      for (const v of state.list.entries()) {
        if (v[1]['unread']) {
          commit('NOTIFICATION_HAS_UNREAD', true)
          break
        }
      }
    },
    notification_list: ({ commit }) => new Promise((resolve, reject) => {
      Notification.list().then(res => {
        if (!res.data) reject(new Error('Got a error when get notification list.'))
        commit('NOTIFICATION_LIST', res.data)
        resolve(res.data)
      }).catch(err => reject(err))
    }),
    notification_read: ({ commit }, id) => new Promise((resolve, reject) => {
      Notification.read(id).then(res => {
        console.log(res)
        commit('NOTIFICATION_READ', id)
      }).catch(err => reject(err))
    }),
    notification_read_all: ({ commit }) => new Promise((resolve, reject) => {
      Notification.readall().then(res => {
        console.log(res)
        commit('NOTIFICATION_READ_ALL')
      }).catch(err => reject(err))
    })
  }
}

export default notification
