import Mock from 'mockjs'
import NotificationVo from '@/vo/notification'

const notifications = []

for (let i = 0; i < 10; i++) {
  const nt = Mock.mock({
    id: '@id',
    creatime: Mock.Random.datetime(),
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
    return notifications
  },
  read: config => {
    const { ids } = JSON.parse(config.body)
    notifications.forEach((value, index) => {
      if (ids.indexOf(value.id + '') !== -1) notifications[index].unread = false
    })
    return 'success'
  },
  readall: () => {
    for (const [v, i] of notifications) {
      console.log('Simulate notifications iterator read all: ', v, i)
      notifications[i]['unread'] = false
    }
    return 'success'
  }
}
