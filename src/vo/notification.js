class NotificationVo {
  constructor(obj) {
    this.id = obj.id
    this.creatime = obj.creatime
    this.uid = obj.uid
    this.from = obj.from
    this.title = obj.title
    this.content = obj.content
    this.unread = obj.unread
    this.deleted = obj.deleted
  }
}

export default NotificationVo
