/**
 * application.
 * @author: gzb
 * @date: 2018-06-18 00:58
 */

import Cookies from 'js-cookie'

const application = {
  state: {
    language: Cookies.get('language') || 'zh',
    device: 'desktop',
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: true
    }
  },
  mutations: {
    APP_TOGGLE_DEVICE: (state, device) => { state.device = device }
  },
  actions: {
    app_toggle_device: ({ commit }, device) => {
      commit('APP_TOGGLE_DEVICE', device)
    }
  }
}

export default application
