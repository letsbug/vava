class ContactsVo {
  constructor(props) {
    /**
     * 用户ID
     */
    this.id = props.id

    /**
     * 身份证号
     */
    this.card = props.card

    /**
     * 姓名
     */
    this.name = props.name

    /**
     * 城市代码
     * @type {*|module.exports.city|string|city|string}
     */
    this.city = props.city

    /**
     * 地区码
     * @type {*|string|module.exports.province|province}
     */
    this.province = props.province

    /**
     * 邮编
     * @type {*|postcode|string}
     */
    this.postcode = props.postcode

    /**
     * 电话号码
     * @type {*|boolean}
     */
    this.tel = props.tel

    /**
     * 手机号码
     * @type {*|string|mobile|y.mobile}
     */
    this.mobile = props.mobile

    /**
     * 传真
     */
    this.fax = props.fax

    /**
     * 电子邮箱
     * @type {*|string|module.exports.email|email}
     */
    this.email = props.email

    /**
     * QQ号码
     * @type {*|string}
     */
    this.qq = props.qq

    /**
     * 公司名称
     * @type {*|company|string}
     */
    this.company = props.company
  }
}

export default ContactsVo
