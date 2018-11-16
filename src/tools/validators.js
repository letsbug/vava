import { Regulars } from './'

/**
 * 必填字段校验
 * @param r
 * @param v
 * @param c
 */
export function validRequired(r, v, c) {
  if (!v || Regulars.empty(v)) {
    c(new Error(this.$t('validate.required')))
  } else c()
}

/**
 * 货币输入校验
 * @param r
 * @param v
 * @param c
 */
export function validCurrency(r, v, c) {
  if (!v || Regulars.empty(v)) {
    c(new Error(this.$t('validate.required')))
  } else if (!Regulars.currency(v)) {
    c(new Error(this.$t('validate.formatBad')))
  } else c()
}

/**
 * 手机号校验
 * @param r
 * @param v
 * @param c
 */
export function validMobile(r, v, c) {
  if (!v || Regulars.empty(v)) {
    c(new Error(this.$t('validate.required')))
  } else if (v.length !== 11) {
    c(new Error(this.$t('validate.lengthBad', { length: 11 })))
  } else if (!Regulars.mobile(v)) {
    c(new Error(this.$t('validate.formatBad') + this.$t('validate.rules.mobile')))
  } else c()
}

/**
 * 座机号校验
 * @param r
 * @param v
 * @param c
 */
export function validPhone(r, v, c) {
  if (!v || Regulars.empty(v)) {
    c(new Error(this.$t('validate.required')))
  } else if (!Regulars.phone(v)) {
    c(new Error(this.$t('validate.formatBad')))
  } else c()
}

/**
 * 手机验证码校验
 * @param r
 * @param v
 * @param c
 */
export function validCaptcha(r, v, c) {
  if (!v || Regulars.empty(v)) {
    c(new Error(this.$t('validate.required')))
  } else if (v.length !== 6) {
    c(new Error(this.$t('validate.lengthBad', { length: 6 })))
  } else if (!Regulars.captcha(v)) {
    c(new Error(this.$t('validate.formatBad') + this.$t('validate.rules.captcha')))
  } else c()
}

/**
 * 电子邮箱校验
 * @param r
 * @param v
 * @param c
 */
export function validEmail(r, v, c) {
  if (!v || Regulars.empty(v)) {
    c(new Error(this.$t('validate.required')))
  } else if (!Regulars.email(v)) {
    c(new Error(this.$t('validate.formatBad')))
  } else c()
}

/**
 * 用户名、账户名校验
 * @param r
 * @param v
 * @param c
 */
export function validUsername(r, v, c) {
  if (!v || Regulars.empty(v)) {
    c(new Error(this.$t('validate.required')))
  } else if (v.length < 4 || v.length > 16) {
    c(new Error(this.$t('validate.lengthMinMaxBad', { min: 4, max: 16 })))
  } else if (!Regulars.username(v)) {
    c(new Error(this.$t('validate.formatBad') + this.$t('validate.rules.username')))
  } else c()
}

/**
 * 密码校验
 * @param r
 * @param v
 * @param c
 * @param rule {boolean} 是否进行密码规则校验
 */
export function validPassword(r, v, c, rule) {
  if (!v || Regulars.empty(v)) {
    c(new Error(this.$t('validate.required')))
  } else if (v.length < 8 || v.length > 16) {
    c(new Error(this.$t('validate.lengthMinMaxBad', { min: 8, max: 16 })))
  } else if (rule && !Regulars.password(v)) {
    c(new Error(this.$t('validate.formatBad') + this.$t('validate.rules.password')))
  } else c()
}

/**
 * 身份证号码校验
 * @param r
 * @param v
 * @param c
 */
export function validIDCard(r, v, c) {
  if (!v || Regulars.empty(v)) {
    c(new Error(this.$t('validate.required')))
  } else if (v.length !== 15 && v.length !== 18) {
    c(new Error(this.$t('validate.lengthTowBad', { one: 15, two: 18 })))
  } else if (!Regulars.IDCard(v)) {
    c(new Error(this.$t('validate.formatBad')))
  } else c()
}

/**
 * 姓名校验
 * @param r
 * @param v
 * @param c
 */
export function validName(r, v, c) {
  if (!v || Regulars.empty(v)) {
    c(new Error(this.$t('validate.required')))
  } else if (v.length < 2 || v.length > 4) {
    c(new Error(this.$t('validate.lengthMinMaxBad', { min: 2, max: 4 })))
  } else if (!Regulars.chinese(v)) {
    c(new Error(this.$t('validate.formatBad')))
  } else c()
}

/**
 * 邮政编码校验
 * @param r
 * @param v
 * @param c
 */
export function validPostcode(r, v, c) {
  if (!v || Regulars.empty(v)) {
    c(new Error(this.$t('validate.required')))
  } else if (v.length !== 6) {
    c(new Error(this.$t('validate.lengthBad', { length: 6 })))
  } else if (!Regulars.postcode(v)) {
    c(new Error(this.$t('validate.formatBad')))
  } else c()
}

/**
 * 银行卡卡号有效性校验
 * @param r
 * @param v
 * @param c
 */
export function validBankcard(r, v, c) {
  if (!v || Regulars.empty(v)) {
    c(new Error(this.$t('validate.required')))
  } else if (!Regulars.number(v)) {
    c(new Error(this.$t('validate.formatBad')))
  } else c()
}

/**
 * 组织机构代码校验
 * @param r
 * @param v
 * @param c
 */
export function validOrgCode(r, v, c) {
  if (!v || Regulars.empty(v)) {
    c(new Error(this.$t('validate.required')))
  } else if (v.length !== 9) {
    c(new Error(this.$t('validate.lengthBad', { length: 9 })))
  } else if (!Regulars.orgCode(v)) {
    c(new Error(this.$t('validate.formatBad')))
  } else c()
}

/**
 * 纳税人识别号校验
 * @param r
 * @param v
 * @param c
 */
export function validTaxpayerCode(r, v, c) {
  if (!v || Regulars.empty(v)) {
    c(new Error(this.$t('validate.required')))
  } else if (v.length !== 15) {
    c(new Error(this.$t('validate.lengthBad', { length: 15 })))
  } else if (!Regulars.taxpayerCode(v)) {
    c(new Error(this.$t('validate.formatBad')))
  } else c()
}

/**
 * 统一社会信用代码
 * @param r
 * @param v
 * @param c
 */
export function validUnifiedSocialCreditCode(r, v, c) {
  if (!v || Regulars.empty(v)) {
    c(new Error(this.$t('validate.required')))
  } else if (v.length !== 18) {
    c(new Error(this.$t('validate.lengthBad', { length: 18 })))
  } else if (!Regulars.unifiedSocialCreditCode(v)) {
    c(new Error(this.$t('validate.formatBad')))
  } else c()
}
