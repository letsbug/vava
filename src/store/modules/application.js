import Cookie from 'js-cookie'

const application = {
  state: {
    language: Cookie.get('language') || 'zh-cmn-Hans',
    device: 'desktop',
    sidebar: {
      opened: !+Cookie.get('sidebar_status')
    }
  },
  mutations: {
    APP_SIDEBAR_TOGGLE: state => {
      Cookie.set('sidebar_status', state.sidebar.opened ? 1 : 0)
      state.sidebar.opened = !state.sidebar.opened
    },
    APP_SIDEBAR_OPEN: state => {
      Cookie.set('sidebar_status', 0)
      state.sidebar.opened = true
    },
    APP_SIDEBAR_CLOSE: state => {
      Cookie.set('sidebar_status', 1)
      state.sidebar.opened = false
    },
    APP_DEVICE_TOGGLE: (state, device) => {
      state.device = device || (state.device === 'desktop' ? 'mobile' : 'desktop')
    }
  },
  actions: {
    app_sidebar_toggle: ({ commit }) => {
      commit('APP_SIDEBAR_TOGGLE')
    },
    app_sidebar_open: ({ commit }) => {
      commit('APP_SIDEBAR_OPEN')
    },
    app_sidebar_close: ({ commit }) => {
      commit('APP_SIDEBAR_CLOSE')
    },
    app_device_toggle: ({ commit }, device) => {
      commit('APP_DEVICE_TOGGLE', device)
    }
  }
}

export default application
