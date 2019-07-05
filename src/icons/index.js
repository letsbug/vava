import Vue from 'vue'
import VaIcon from '@/components/VaIcons'

// Register as a global component
Vue.component('VaIcon', VaIcon)

const icons = require.context('./svgs', false, /\.svg$/)
const req = context => context.keys().map(context)
req(icons)
