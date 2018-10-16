const tabs = {
  state: {
    list: [],
    overflows: [],
    cached: []
  },
  mutations: {
    TABS_ADD: (state, route) => {
      if (state.list.some(v => v.path === route.path)) return
      state.list.push({
        name: route.name,
        path: route.path,
        title: route.meta.title || 'no-name'
      })
      if (!route.meta.nocache) state.cached.push(route.name)
    },
    TABS_DEL: (state, route) => {
      for (const [i, v] of state.list.entries()) {
        if (v.path === route.path) {
          state.list.splice(i, 1)
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
      for (const [i, v] of state.list.entries()) {
        if (v.path === route.path) {
          state.list = state.list.splice(i, 1)
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
      state.list = []
      state.cached = []
    }
  },
  actions: {
    tabs_add: ({ commit, state }, route) => new Promise(resolve => {
      const before = [...state.list].length
      commit('TABS_ADD', route)
      const after = [...state.list].length
      resolve(after > before)
    }),
    tabs_del: ({ commit, state }, route) => new Promise(resolve => {
      commit('TABS_DEL', route)
      resolve([...state.list])
    }),
    tabs_del_others: ({ commit, state }, route) => new Promise(resolve => {
      commit('TABS_DEL_OTHERS', route)
      resolve([...state.list])
    }),
    tabs_empty: ({ commit, state }) => new Promise(resolve => {
      commit('TABS_EMPTY')
      resolve([...state.list])
    })
  }
}

export default tabs
