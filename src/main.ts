import Vue from 'vue';

import 'normalize.css';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/display.css';
import '@/styles/va.core.scss';

import App from './App.vue';
import store from './store';
import router from './router';
import '@/router/helper'; // router helper, user permission control.
import i18n from '@/i18n';

import '@/icons'; // load system svg icons by symbol.
import '@/themes';

import * as filters from '@/filters';
// Inject global directives, or local calls, as needed.
// import * as Directives from '@/directives'

// Baidu & Google analytics. According to the need to enable.
// To use google analytics', perform npm install --save vue-analytics installation
// import hmt from "vue-ba";
// import vga from 'vue-analytics'

// import { mockXHR } from "../mock";
// if (process.env.NODE_ENV === "production") {
//   mockXHR();
// }

Vue.use(Element, {
  size: 'medium',
  i18n: (path: string, option: string) => i18n.t(path, option)
});

// register global filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, (filters as { [key: string]: Function })[key]);
});

// Inject global directives, or local calls, as needed.
// Object.keys(Directives).forEach(key => {
//   Vue.directive(key, Directives[key])
// })

// if (process.env.NODE_ENV === "production") {
//   Vue.use(hmt, {
//     siteId: "9e73d1f3aef423e62a00c7575a9c0f08",
//     debug: process.env.NODE_ENV !== "prod"
//   });
//   // Vue.use(vga, { id: 'UA-106135225-2' })
// }

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
});
