import Vue from 'vue';
import VueI18n from 'vue-i18n';

import { getLanguage } from '@/utils/cookies';

import ElementEn from 'element-ui/lib/locale/lang/en';
import ElementZh from 'element-ui/lib/locale/lang/zh-CN';
// Custom locales
import enLocale from './en';
import zhLocale from './zh';

Vue.use(VueI18n);

const messages = {
  en: {
    ...enLocale,
    ...ElementEn
  },
  zh: {
    ...zhLocale,
    ...ElementZh
  }
};

const i18n = new VueI18n({
  locale: getLanguage(),
  messages
});

export const generateTitle = (title: string) => (i18n.te(`router.${title}`) ? i18n.t(`router.${title}`) : title);

export default i18n;
