/**
 * 空字符串（含空格）校验
 * @param v
 */
const empty = v => {
  return new RegExp(/^[ ]*$/).test(v)
}

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
  return new RegExp(/^(\d|[A-Z]){4}$/).test(v)
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
 * @returns {boolean}
 */
const url = v => {
  return new RegExp(/^(https?|ftp):\/\/[^\s]*/).test(v)
}

/**
 * 地区编码校验
 * @param v
 * @returns {boolean}
 */
const addressCode = v => {
  const addrs = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }
  const check = new RegExp(/^[1-9]\d{5}$/).test(v)
  return check && addrs[parseInt(v.substring(0, 2))]
}

/**
 * 组织机构代码校验
 * 1-8位（数字或大写拉丁字母）为本体代码，9位（数字或大写拉丁字母）为校验码
 * @param v
 * @returns {boolean}
 */
const orgCode = v => {
  // console.log('Valid Organization Code: ', v)
  if (!new RegExp(/^([0-9A-Z]){8}[0-9|X]$/).test(v)) {
    // console.log('Valid org step1, Result: ', new RegExp(/^([0-9A-Z]){8}[0-9|X]$/).test(v))
    return false
  }

  const ws = [3, 7, 9, 10, 5, 8, 4, 2]
  const str = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let sum = 0
  for (let i = 0; i < 8; i++) {
    sum += str.indexOf(v.charAt(i)) * ws[i]
  }
  let c9 = 11 - (sum % 11)
  // console.log('Valid org step2, c9: ', c9)
  c9 = (c9 === 10) ? 'X' : (c9 === 11) ? '0' : c9 + ''

  // console.log('Valid Organization Code: ', c9 === v.charAt(8))
  return c9 === v.charAt(8)
}

/**
 * 纳税人识别号校验（企业，15位）
 * 1—2位为省、市代码，3—6位为地区代码，7—8位为经济性质代码，9—10位行业代码，11—15位为各地自设的顺序码
 * @param v
 * @returns {boolean}
 */
const taxpayerCode = v => {
  return addressCode(v.substr(0, 6)) && orgCode(v.substr(6, 9))
}

/**
 * 统一社会信用代码校验（18位）
 * 由十八位的数字或大写英文字母（不适用I、O、Z、S、V）组成，由五个部分组成：
 * 第一部分（第1位）为登记管理部门代码，9表示工商部门；(数字或大写英文字母)
 * 第二部分（第2位）为机构类别代码;(数字或大写英文字母)
 * 第三部分（第3-8位）为登记管理机关行政区划码；(数字)
 * 第四部分（第9-17位）为全国组织机构代码；(数字或大写英文字母)
 * 第五部分（第18位）为校验码(数字或大写英文字母)
 * @param v
 * @returns {boolean}
 */
const unifiedSocialCreditCode = v => {
  const valid = new RegExp(/^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g).test(v)
  // console.log('Valid Unified Social Credit Code: ', valid)
  return valid && orgCode(v.substr(8, 9))
}

export default {
  empty,
  number,
  english,
  chinese,
  mobile,
  phone,
  email,
  postcode,
  captcha,
  IDCard,
  url,
  addressCode,
  orgCode,
  taxpayerCode,
  unifiedSocialCreditCode
}
