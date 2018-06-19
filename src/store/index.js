import Vue from 'vue'
import Vuex from 'vuex'

import application from './modules/application'
import user from './modules/userInfo'
import permission from './modules/permission'
import tabs from './modules/apptab'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    application,
    user,
    permission,
    tabs
  },
  getters
})

export default store
