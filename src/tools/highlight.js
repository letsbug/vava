import Vue from 'vue'

import highlight from 'highlight.js'
import 'highlight.js/styles/github.css'

Vue.directive('highlight', el => {
  console.log(el)
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach(block => {
    highlight.highlightBlock(block)
  })
})
