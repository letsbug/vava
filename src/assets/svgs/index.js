import Vue from 'vue'
import VaSvgs from '@/components/VaSvgs'

// Register as a global component
Vue.component('VaSvgs', VaSvgs)

const imgs = require.context('./', false, /\.svg$/)
const req = context => context.keys().map(context)
req(imgs)
