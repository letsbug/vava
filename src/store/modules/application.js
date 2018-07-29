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
    APP_TOGGLE_SIDEBAR: state => {
      Cookies.set('sidebarStatus', (state.sidebar.opened) ? 1 : 0)
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = true
    },
    APP_SIDEBAR_CLOSE: state => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
    },
    APP_TOGGLE_DEVICE: (state, device) => { state.device = device }
  },
  actions: {
    app_sidebar_toggle: ({ commit }) => {
      commit('APP_TOGGLE_SIDEBAR')
    },
    app_sidebar_close: ({ commit }) => {
      commit('APP_SIDEBAR_CLOSE')
    },
    app_toggle_device: ({ commit }, device) => {
      commit('APP_TOGGLE_DEVICE', device)
    }
  }
}

export default application
