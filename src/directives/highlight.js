import highlight from 'highlight.js'
import 'highlight.js/styles/github.css'

const Hightlight = {
  bind: el => {
    const blocks = el.querySelectorAll('pre code')
    blocks.forEach(block => {
      highlight.highlightBlock(block)
    })
  }
}

export default Hightlight
