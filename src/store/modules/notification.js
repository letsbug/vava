import Notification from '@/services/notification'

const notification = {
  state: {
    read: [],
    unread: []
  },
  mutations: {
    NOTIFICATION_LIST: (state, list) => {
      state.read.length = 0
      state.unread.length = 0
      list.map(v => state[v.unread ? 'unread' : 'read'].push(v))
    },
    NOTIFICATION_READ: (state, ids) => {
      console.log(ids)
      state.unread.forEach((value, index) => {
        if (ids.indexOf(value.id) !== -1) {
          value.unread = false
          state.read.push(value)
          state.unread.splice(index, 1)
        }
      })
    },
    NOTIFICATION_READ_ALL: (state) => {
      state.read = [].concat(state.read, state.unread)
      state.unread.length = 0
    }
  },
  actions: {
    notification_list: ({ commit }) => new Promise((resolve, reject) => {
      Notification.list().then(res => {
        if (!res.data) reject(new Error('Got a error when get notification list.'))
        commit('NOTIFICATION_LIST', res.data)
        resolve(res.data)
      }).catch(err => reject(err))
    }),
    notification_read: ({ commit }, ids) => new Promise((resolve, reject) => {
      Notification.read(ids).then(res => {
        if (!res.data || res.data !== 'success') reject(new Error('Got a error when mark notification read.'))
        commit('NOTIFICATION_READ', ids)
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
