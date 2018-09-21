import NotificationVo from '@/vo/notification'
import Notification from '@/services/notification'

const notification = {
  state: {
    notification: [NotificationVo]
  },
  mutations: {
    NOTIFICATION_LIST: (state, list) => {
      state.notification = list
    }
  },
  actions: {
    notification_list: ({ commit }, list) => new Promise((resolve, reject) => {
      Notification.list().then(res => {
        console.log(res)
      })
      commit('NOTIFICATION_LIST', list)
    })
  }
}

export default notification
