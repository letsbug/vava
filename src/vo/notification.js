class NotificationVo {
  constructor(obj) {
    this.id = obj.id

    /**
     * 产生日期
     */
    this.date = obj.date
    this.uid = obj.uid

    /**
     * 来自于谁
     */
    this.from = obj.from

    /**
     * 标题
     */
    this.title = obj.title

    /**
     * 是否未读标记
     * @type {*|boolean}
     */
    this.unread = obj.unread

    /**
     * 已删除标记
     * @type {*|string|boolean}
     */
    this.deleted = obj.deleted
  }
}

export default NotificationVo
