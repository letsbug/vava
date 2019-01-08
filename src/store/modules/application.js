import Cookie from 'js-cookie'

const application = {
  state: {
    language: Cookie.get('language') || 'en',
    device: 'desktop',
    sidebar: {
      opened: !+Cookie.get('sidebar_status')
    },
    theme: {
      style: Cookie.get('theme_style') || 'normally',
      color: Cookie.get('theme_color') || '#28a745'
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
    },
    APP_LANGUAGE_SET: (state, lang) => {
      state.language = lang
      Cookie.set('language', lang)
    },
    APP_THEME_STYLE_SET: (state, style) => {
      if (!['normally', 'light'].includes(style)) return
      state.theme.style = style
      Cookie.set('theme_style', style)
    },
    APP_THEME_COLOR_SET: (state, color) => {
      state.theme.color = color
      Cookie.set('theme_color', color)
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
    },
    app_language_set: ({ commit }, lang) => {
      commit('APP_LANGUAGE_SET', lang)
    },
    app_theme_style_set: ({ commit }, style) => {
      commit('APP_THEME_STYLE_SET', style)
    },
    app_theme_color_set: ({ commit }, color) => {
      commit('APP_THEME_COLOR_SET', color)
    },
    app_theme_set: ({ commit }, theme) => {
      commit('APP_THEME_STYLE_SET', theme.style)
      commit('APP_THEME_COLOR_SET', theme.color)
    }
  }
}

export default application
