/**
 * 数字字符串校验（只允许数字）
 * @param v
 * @returns {*}
 */
const number = v => {
  return v.test(/^[0-9]+$/)
}

/**
 * 英文字母校验（只允许英文字母）
 * @param v
 * @returns {*}
 */
const english = v => {
  return v.test(/^[a-zA-Z]*$/)
}

/**
 * 中文汉字校验（只允许中文字符串）
 * @param v
 * @returns {boolean}
 */
const chinese = v => {
  return v.test(/^[\u0391-\uFFE5]+$/)
}

/**
 * 手机号码校验
 * @param v
 * @returns {boolean}
 */
const mobile = v => {
  return v.test(/^[1][3|456789][0-9]{9}$/)
}

/**
 * 座机号码校验
 * @param v
 * @returns {boolean}
 */
const phone = v => {
  return v.test(/^0\d{2,3}-?\d{7,8}$/)
}

/**
 * 电子邮箱校验
 * @param v
 * @returns {boolean}
 */
const email = v => {
  return v.test(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/)
}

/**
 * 邮政编码校验
 * @param v
 * @returns {boolean}
 */
const postcode = v => {
  return v.test(/^[1-9][0-9]{5}$/)
}

/**
 * 手机验证码校验
 * @param v
 * @returns {boolean}
 */
const captcha = v => {
  return v.test(/^.{4}$/)
}

/**
 * 身份证正确性校验
 * @param v
 * @returns {boolean}
 */
const IDCard = v => {
  return v.test(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)
}

/**
 * 常规URL校验
 * @param v
 * @returns {*}
 */
const url = v => {
  return v.test(/[a-zA-z]+:\/\/[^\s]*/)
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
