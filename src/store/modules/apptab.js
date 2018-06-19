/**
 * apptab.
 * @author: gzb
 * @date: 2018-06-19 23:12
 */

const tabs = {
  state: {
    visited: [],
    cached: []
  },
  mutations: {
    TABS_ADD: (state, view) => {
      if (state.visited.some(v => v.path === view.path)) return
      state.visited.push({
        name: view.name,
        path: view.path,
        title: view.meta.title || 'no-name'
      })
      if (!view.meta.nocache) state.cached.push(view.name)
    },
    TABS_DEL: (state, view) => {
      for (const [i, v] of state.visited.entries()) {
        if (v.path === view.path) {
          state.visited.splice(i, 1)
          break
        }
      }
      for (const [i, v] of state.cached.entries()) {
        if (v === view.name) {
          state.cached.splice(i, 1)
          break
        }
      }
    },
    TABS_DEL_OTHERS: (state, view) => {
      for (const [i, v] of state.visited.entries()) {
        if (v.path === view.path) {
          state.visited = state.visited.splice(i, 1)
          break
        }
      }
      for (const [i, v] of state.cached.entries()) {
        if (v === view.name) {
          state.cached = state.cached.splice(i, 1)
          break
        }
      }
    },
    TABS_EMPTY: (state) => {
      state.visited = []
      state.cached = []
    }
  },
  actions: {
    tabs_add: ({ commit }, view) => {
      commit('TABS_ADD', view)
    },
    tabs_del: ({ commit, state }, view) => new Promise(resolve => {
      commit('TABS_DEL', view)
      resolve([...state.visited])
    }),
    tabs_del_others: ({ commit, state }, view) => new Promise(resolve => {
      commit('TABS_DEL_OTHERS', view)
      resolve([...state.visited])
    }),
    tabs_empty: ({ commit, state }) => new Promise(resolve => {
      commit('TABS_EMPTY')
      resolve([...state.visited])
    })
  }
}

export default tabs
