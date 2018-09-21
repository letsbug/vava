import Mock from 'mockjs'
import NotificationVo from '@/vo/notification'

const notifications = []

for (let i = 0; i < 60; i++) {
  const nt = Mock.mock({
    id: '@title',
    creatime: Mock.Random.datetime(),
    uid: '',
    from: '',
    title: '@title',
    content: '@title',
    unread: Mock.Random.boolean(),
    deleted: false
  })
  notifications.push(new NotificationVo(nt))
}

export default {
  list: config => {
    return notifications
  },
  read: config => {},
  readall: config => {}
}
