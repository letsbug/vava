class NotificationVo {
  constructor(obj) {
    this.id = obj.id
    this.date = obj.date
    this.uid = obj.uid
    this.from = obj.from
    this.title = obj.title
    this.unread = obj.unread
    this.deleted = obj.deleted
  }
}

export default NotificationVo
