import Vue from 'vue'
import VaIcon from '@/components/va-icons'

Vue.component('va-icon', VaIcon)

const requires = require.context('@/assets/icons', false, /\.svg$/)
const reqAll = context => context.keys().map(context)
reqAll(requires)
