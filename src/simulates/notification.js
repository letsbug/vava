import Mock from 'mockjs'
import NotificationVo from '@/vo/notification'

const notifications = []

const random = now => Mock.mock({
  id: '@guid',
  date: +new Date(now ? Mock.Random.now(now) : Mock.Random.datetime()),
  uid: '',
  from: 'system',
  title: '@sentence',
  unread: Mock.Random.boolean(),
  deleted: false
})

for (let i = 0; i < 10; i++) {
  notifications.push(new NotificationVo(random()))
}

export default {
  list: () => {
    notifications.push(new NotificationVo(random('year')))
    notifications.push(new NotificationVo(random('month')))
    notifications.push(new NotificationVo(random('week')))
    notifications.push(new NotificationVo(random('day')))
    notifications.push(new NotificationVo(random('hour')))
    notifications.push(new NotificationVo(random('minute')))
    notifications.push(new NotificationVo(random('second')))
    return notifications.sort((a, b) => (a.date < b.date ? 1 : -1))
  },
  read: config => {
    const { ids } = JSON.parse(config.body)
    notifications.forEach((value, index) => {
      if (~ids.indexOf(value.id + '')) notifications[index].unread = false
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
