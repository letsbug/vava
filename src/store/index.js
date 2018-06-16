import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import userInfo from './modules/userInfo'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    userInfo
  },
  getters
})

export default store
