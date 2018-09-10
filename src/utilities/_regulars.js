/**
 * 数字字符串校验（只允许数字）
 * @param v
 * @returns {*}
 */
const number = v => {
  return new RegExp(/^[0-9]+$/).test(v)
}

/**
 * 英文字母校验（只允许英文字母）
 * @param v
 * @returns {*}
 */
const english = v => {
  return new RegExp(/^[a-zA-Z]*$/).test(v)
}

/**
 * 中文汉字校验（只允许中文字符串）
 * @param v
 * @returns {boolean}
 */
const chinese = v => {
  return new RegExp(/^[\u0391-\uFFE5]+$/).test(v)
}

/**
 * 手机号码校验
 * @param v
 * @returns {boolean}
 */
const mobile = v => {
  return new RegExp(/^[1][3|456789][0-9]{9}$/).test(v)
}

/**
 * 座机号码校验
 * @param v
 * @returns {boolean}
 */
const phone = v => {
  return new RegExp(/^0\d{2,3}-?\d{7,8}$/).test(v)
}

/**
 * 电子邮箱校验
 * @param v
 * @returns {boolean}
 */
const email = v => {
  return new RegExp(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/).test(v)
}

/**
 * 邮政编码校验
 * @param v
 * @returns {boolean}
 */
const postcode = v => {
  return new RegExp(/^[1-9][0-9]{5}$/).test(v)
}

/**
 * 手机验证码校验
 * @param v
 * @returns {boolean}
 */
const captcha = v => {
  return new RegExp(/^.{4}$/).test(v)
}

/**
 * 身份证正确性校验
 * @param v
 * @returns {boolean}
 */
const IDCard = v => {
  return new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/).test(v)
}

/**
 * 常规URL校验
 * @param v
 * @returns {*}
 */
const url = v => {
  return new RegExp(/[a-zA-z]+:\/\/[^\s]*/).test(v)
}

export default {
  number,
  english,
  chinese,
  mobile,
  phone,
  email,
  postcode,
  captcha,
  IDCard,
  url
}
