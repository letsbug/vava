import Notification from '@/apis/notification'

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
      let has = false
      state.list.forEach((value, index) => {
        if (~ids.indexOf(value.id)) state.list[index].unread = false
        if (value.unread) has = true
      })
      state.hasUnread = has
    },
    NOTIFICATION_READ_ALL: (state) => {
      state.list.forEach((v, i) => { state.list[i].unread = false })
      state.hasUnread = false
    }
  },
  actions: {
    notification_list: ({ commit }) => {
      Notification.list().then(res => {
        commit('NOTIFICATION_LIST', res.data)
      }).catch(err => console.log(err))
    },
    notification_read: ({ commit }, ids) => {
      Notification.read(ids).then(res => {
        if (res.success) commit('NOTIFICATION_READ', ids)
      }).catch(err => console.log(err))
    },
    notification_read_all: ({ commit }) => {
      Notification.readall().then(res => {
        if (res.success) commit('NOTIFICATION_READ_ALL')
      }).catch(err => console.log(err))
    }
  }
}

export default notification
