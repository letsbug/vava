import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import application from './modules/application'
import user from './modules/userInfo'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    application,
    user,
    permission
  },
  getters
})

export default store
