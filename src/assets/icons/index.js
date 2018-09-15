import Vue from 'vue'
import VaIcon from '@/components/va-icons'

Vue.component('va-icon', VaIcon)

const requires = require.context('@/assets/icons', false, /\.svg$/)
const reqAll = con => con.keys().map(con)
reqAll(requires)
