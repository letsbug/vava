import Vue from 'vue'
import Vuex from 'vuex'

import application from './modules/application'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    application
  },
  getters
})

export default store
