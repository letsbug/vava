import Regulars from './_regulars'

/**
 * 手机号校验
 * @param r
 * @param v
 * @param c
 */
const mobile = (r, v, c) => {
  console.log(r, v)
  if (Regulars.empty(v)) c(new Error('请输入手机号码.'))
  else if (v.length !== 11) c(new Error('请输入正确的11位手机号码.'))
  else if (!Regulars.mobile(v)) c(new Error('手机号码验证失败.'))
  else c()
}

/**
 * 座机号校验
 * @param r
 * @param v
 * @param c
 */
const phone = (r, v, c) => {
  console.log(r, v)
  if (Regulars.empty(v)) c(new Error('请输入座机号码.'))
  else if (!Regulars.phone(v)) c(new Error('请输入正确的座机号码.'))
  else c()
}

/**
 * 手机验证码校验
 * @param r
 * @param v
 * @param c
 */
const captcha = (r, v, c) => {
  console.log(r, v)
  if (Regulars.empty(v)) c(new Error('请输入手机验证码.'))
  else if (v.length !== 4) c(new Error('请输入正确的4位手机验证码.'))
  else if (!Regulars.captcha(v)) c(new Error('手机验证码错误.'))
  else c()
}

/**
 * 电子邮箱校验
 * @param r
 * @param v
 * @param c
 */
const email = (r, v, c) => {
  console.log(r, v)
  if (Regulars.empty(v)) c(new Error('请输入电子邮箱.'))
  else if (!Regulars.email(v)) c(new Error('邮箱格式错误.'))
  else c()
}

/**
 * 身份证号码校验
 * @param r
 * @param v
 * @param c
 */
const IDCard = (r, v, c) => {
  console.log(r, v)
  if (Regulars.empty(v)) c(new Error('请输入身份证号码.'))
  else if (v.length !== 15 || v.length !== 18) c(new Error('请输入正确的15或18位身份证号码.'))
  else if (!Regulars.IDCard(v)) c(new Error('请输入正确的身份证号码.'))
  else c()
}

/**
 * 姓名校验
 * @param r
 * @param v
 * @param c
 */
const name = (r, v, c) => {
  console.log(r, v)
  if (Regulars.empty(v)) c(new Error('请输入您的姓名.'))
  else if (v.length < 2 || v.length > 4) c(new Error('您输入的姓名超出规定长度.'))
  else if (!Regulars.chinese(v)) c(new Error('请输入正确的中文姓名.'))
  else c()
}

/**
 * 邮政编码校验
 * @param r
 * @param v
 * @param c
 */
const postcode = (r, v, c) => {
  console.log(r, v)
  if (Regulars.empty(v)) c(new Error('请输入邮政编码.'))
  else if (v.length !== 6) c(new Error('邮政编码由6位数字组成，请正确填写.'))
  else if (!Regulars.postcode(v)) c(new Error('请输入正确的邮政编码.'))
  else c()
}

/**
 * 银行卡卡号有效性校验
 * @param r
 * @param v
 * @param c
 */
const bankcard = (r, v, c) => {
  console.log(r, v)
  if (Regulars.empty(v)) c(new Error('请输入您的银行账户.'))
  else if (Regulars.number(v)) c(new Error('请输入正确的银行账户.'))
  else c()
}

/**
 * 组织机构代码校验
 * @param r
 * @param v
 * @param c
 */
const orgcode = (r, v, c) => {
  console.log(r, v)
  if (Regulars.empty(v)) c(new Error('请输入组织机构代码.'))
  else if (v.length !== 9) c(new Error('组织机构代码由9位字符组成，请重新填写.'))
  else if (!new RegExp(/^[0-9A-Z]+$/).test(v)) c(new Error('组织机构代码由大写字母和数字组成，请重新填写.'))
  else if (!new RegExp(/^[0-9X]+$/).test(v)) c(new Error('组织机构代码最后一位只可为数字或大写拉丁字母“X”'))
}

export default {
  mobile,
  phone,
  captcha,
  email,
  IDCard,
  name,
  postcode,
  bankcard,
  orgcode
}
