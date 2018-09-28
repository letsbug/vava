import Mock from 'mockjs'
import NotificationVo from '@/vo/notification'

const notifications = []

for (let i = 0; i < 10; i++) {
  const nt = Mock.mock({
    id: '@guid',
    date: Mock.Random.datetime(),
    uid: '',
    from: 'system',
    title: '@sentence',
    unread: Mock.Random.boolean(),
    deleted: false
  })
  notifications.push(new NotificationVo(nt))
}

export default {
  list: () => {
    return notifications.sort((a, b) => (a.date < b.date ? 1 : -1))
  },
  read: config => {
    const { ids } = JSON.parse(config.body)
    notifications.forEach((value, index) => {
      if (ids.indexOf(value.id + '') !== -1) notifications[index].unread = false
    })
    return 'success'
  },
  readall: () => {
    notifications.forEach((v, i) => {
      notifications[i]['unread'] = false
    })
    return 'success'
  }
}
