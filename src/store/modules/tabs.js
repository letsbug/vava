const tabs = {
  state: {
    history: [],
    cached: []
  },
  mutations: {
    TABS_ADD: (state, route) => {
      if (state.history.some(v => v.path === route.path)) {
        return
      }

      state.history.push(Object.assign({}, route, {
        title: route.meta.title || 'no-name'
      }))

      if (!route.meta.nocache) {
        state.cached.push(route.name)
      }
    },
    TABS_DEL: (state, route) => {
      for (const [i, v] of state.history.entries()) {
        if (v.path === route.path) {
          state.history.splice(i, 1)
          break
        }
      }
      for (const [i, v] of state.cached.entries()) {
        if (v === route.name) {
          state.cached.splice(i, 1)
          break
        }
      }
    },
    TABS_DEL_OTHERS: (state, route) => {
      for (const [i, v] of state.history.entries()) {
        if (v.path === route.path) {
          state.history = state.history.splice(i, 1)
          break
        }
      }
      for (const [i, v] of state.cached.entries()) {
        if (v === route.name) {
          state.cached = state.cached.splice(i, 1)
          break
        }
      }
    },
    TABS_EMPTY: state => {
      state.history = []
      state.cached = []
    }
  },
  actions: {
    tabs_add: ({ commit, state }, route) => new Promise(resolve => {
      commit('TABS_ADD', route)
      resolve([...state.history])
    }),
    tabs_del: ({ commit, state }, route) => new Promise(resolve => {
      commit('TABS_DEL', route)
      resolve([...state.history])
    }),
    tabs_del_others: ({ commit, state }, route) => new Promise(resolve => {
      commit('TABS_DEL_OTHERS', route)
      resolve([...state.history])
    }),
    tabs_empty: ({ commit, state }) => new Promise(resolve => {
      commit('TABS_EMPTY')
      resolve([...state.history])
    })
  }
}

export default tabs
