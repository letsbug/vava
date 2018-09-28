import Notification from '@/services/notification'

const notification = {
  state: {
    list: [],
    hasUnread: false
  },
  mutations: {
    NOTIFICATION_LIST: (state, list) => {
      state.list = list.map(v => {
        if (v.unread) state.hasUnread = true
        return v
      })
    },
    NOTIFICATION_READ: (state, ids) => {
      console.log(ids)
      state.list.forEach((value, index) => {
        if (ids.indexOf(value.id) !== -1) {
          state.list[index].unread = false
        }
      })
    },
    NOTIFICATION_READ_ALL: (state) => {
      state.list.forEach((v, i) => { state.list[i].unread = false })
      state.hasUnread = false
    }
  },
  actions: {
    notification_list: ({ commit }) => {
      Notification.list().then(res => {
        if (!res.data) return
        commit('NOTIFICATION_LIST', res.data)
      }).catch(err => console.log(err))
    },
    notification_read: ({ commit }, ids) => {
      Notification.read(ids).then(res => {
        if (!res.data || res.data !== 'success') return
        commit('NOTIFICATION_READ', ids)
      }).catch(err => console.log(err))
    },
    notification_read_all: ({ commit }) => {
      Notification.readall().then(res => {
        if (res.data === 'success') commit('NOTIFICATION_READ_ALL')
      }).catch(err => console.log(err))
    }
  }
}

export default notification
