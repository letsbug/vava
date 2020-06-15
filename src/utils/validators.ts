import * as RegExps from '@/utils/regexps';

const messages = {
  required: '此项为必填项！',
  formatBad: '错误的输入！',
  lengthBad: (length: number) => `长度必须是${length}，请重新输入。`,
  lengthTwoBad: (start: number, end: number) => `长度必须是${start}或者${end}，请重新输入。`,
  lengthMinBad: (start: number) => `长度必须大于${start}，请重新输入。`,
  lengthMaxBad: (end: number) => `长度必须小于${end}，请重新输入。`,
  lengthMinMaxBad: (start: number, end: number) => `长度必须在${start}到${end}之间，请重新输入。`,
  account: '以字母开头，可包含 " . _ @ "',
  password: '密码由数字和字母组成',
  email: '（例：example@xx.com）',
  mobile: '只能是数字',
  phone: '（区号-电话号码）',
  captcha: '（仅限数字和大写字母）',
};

/**
 * 必填字段校验
 * @param r {*}
 * @param v {string}
 * @param c {function}
 */
export function validRequired(r: any, v: string, c: Function) {
  if (!v || RegExps.isEmpty(v)) {
    c(new Error(messages.required));
  } else c();
}

/**
 * 货币输入校验
 * @param r
 * @param v
 * @param c
 */
export function validCurrency(r: any, v: string, c: Function) {
  if (!v || RegExps.isEmpty(v)) {
    c(new Error(messages.required));
  } else if (!RegExps.isCurrency(v)) {
    c(new Error(messages.formatBad));
  } else c();
}

/**
 * 手机号校验
 * @param r
 * @param v
 * @param c
 */
export function validMobile(r: any, v: string, c: Function) {
  if (!v || RegExps.isEmpty(v)) {
    c(new Error(messages.required));
  } else if (v.length !== 11) {
    c(new Error(messages.lengthBad(11)));
  } else if (!RegExps.isMobile(v)) {
    c(new Error(messages.formatBad + messages.mobile));
  } else c();
}

/**
 * 座机号校验
 * @param r
 * @param v
 * @param c
 */
export function validPhone(r: any, v: string, c: Function) {
  if (!v || RegExps.isEmpty(v)) {
    c(new Error(messages.required));
  } else if (!RegExps.isPhone(v)) {
    c(new Error(messages.formatBad));
  } else c();
}

/**
 * 手机验证码校验
 * @param r
 * @param v
 * @param c
 */
export function validCaptcha(r: any, v: string, c: Function) {
  if (!v || RegExps.isEmpty(v)) {
    c(new Error(messages.required));
  } else if (v.length !== 6) {
    c(new Error(messages.lengthBad(6)));
  } else if (!RegExps.isCaptcha(v)) {
    c(new Error(messages.formatBad + messages.captcha));
  } else c();
}

/**
 * 电子邮箱校验
 * @param r
 * @param v
 * @param c
 */
export function validEmail(r: any, v: string, c: Function) {
  if (!v || RegExps.isEmpty(v)) {
    c(new Error(messages.required));
  } else if (!RegExps.isEmail(v)) {
    c(new Error(messages.formatBad));
  } else c();
}

/**
 * 用户名、账户名校验
 * @param r
 * @param v
 * @param c
 */
export function validAccount(r: any, v: string, c: Function) {
  if (!v || RegExps.isEmpty(v)) {
    c(new Error(messages.required));
  } else if (v.length < 4 || v.length > 16) {
    c(new Error(messages.lengthMinMaxBad(4, 16)));
  } else if (!RegExps.isAccount(v)) {
    c(new Error(messages.formatBad + messages.account));
  } else c();
}

/**
 * 密码校验
 * @param r
 * @param v
 * @param c
 * @param rule {boolean} 是否进行密码规则校验
 */
export function validPassword(r: any, v: string, c: Function, rule: boolean) {
  if (!v || RegExps.isEmpty(v)) {
    c(new Error(messages.required));
  } else if (v.length < 8 || v.length > 16) {
    c(new Error(messages.lengthMinMaxBad(8, 16)));
  } else if (rule && !RegExps.isPassword(v)) {
    c(new Error(messages.formatBad + messages.password));
  } else c();
}

/**
 * 身份证号码校验
 * @param r
 * @param v
 * @param c
 */
export function validIDCard(r: any, v: string, c: Function) {
  if (!v || RegExps.isEmpty(v)) {
    c(new Error(messages.required));
  } else if (v.length !== 15 && v.length !== 18) {
    c(new Error(messages.lengthTwoBad(15, 18)));
  } else if (!RegExps.isIDCard(v)) {
    c(new Error(messages.formatBad));
  } else c();
}

/**
 * 姓名校验
 * @param r
 * @param v
 * @param c
 */
export function validName(r: any, v: string, c: Function) {
  if (!v || RegExps.isEmpty(v)) {
    c(new Error(messages.required));
  } else if (v.length < 2 || v.length > 4) {
    c(new Error(messages.lengthMinMaxBad(2, 4)));
  } else if (!RegExps.isChinese(v)) {
    c(new Error(messages.formatBad));
  } else c();
}

/**
 * 邮政编码校验
 * @param r
 * @param v
 * @param c
 */
export function validPostcode(r: any, v: string, c: Function) {
  if (!v || RegExps.isEmpty(v)) {
    c(new Error(messages.required));
  } else if (v.length !== 6) {
    c(new Error(messages.lengthBad(6)));
  } else if (!RegExps.isPostcode(v)) {
    c(new Error(messages.formatBad));
  } else c();
}

/**
 * 银行卡卡号有效性校验
 * @param r
 * @param v
 * @param c
 */
export function validBankcard(r: any, v: string, c: Function) {
  if (!v || RegExps.isEmpty(v)) {
    c(new Error(messages.required));
  } else if (!RegExps.isNumber(v)) {
    c(new Error(messages.formatBad));
  } else c();
}

/**
 * 组织机构代码校验
 * @param r
 * @param v
 * @param c
 */
export function validOrgCode(r: any, v: string, c: Function) {
  if (!v || RegExps.isEmpty(v)) {
    c(new Error(messages.required));
  } else if (v.length !== 9) {
    c(new Error(messages.lengthBad(9)));
  } else if (!RegExps.isOrgCode(v)) {
    c(new Error(messages.formatBad));
  } else c();
}

/**
 * 纳税人识别号校验
 * @param r
 * @param v
 * @param c
 */
export function validTaxpayerCode(r: any, v: string, c: Function) {
  if (!v || RegExps.isEmpty(v)) {
    c(new Error(messages.required));
  } else if (v.length !== 15) {
    c(new Error(messages.lengthBad(15)));
  } else if (!RegExps.isTaxpayerCode(v)) {
    c(new Error(messages.formatBad));
  } else c();
}

/**
 * 统一社会信用代码
 * @param r
 * @param v
 * @param c
 */
export function validUnifiedSocialCreditCode(r: any, v: string, c: Function) {
  if (!v || RegExps.isEmpty(v)) {
    c(new Error(messages.required));
  } else if (v.length !== 18) {
    c(new Error(messages.lengthBad(18)));
  } else if (!RegExps.isUnifiedSocialCreditCode(v)) {
    c(new Error(messages.formatBad));
  } else c();
}
