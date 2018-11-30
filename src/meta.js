import Cookie from 'js-cookie'

export const meta = {
  htmlAttrs: {
    // https://www.zhihu.com/question/20797118
    // https://tools.ietf.org/html/bcp47
    lang: Cookie.get('language') === 'zh' ? 'zh-cmn-Hans' : 'en'
  },
  title: 'A Magical vue admin template',
  titleTemplate: '%s · Vava'
}
