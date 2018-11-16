import Vue from 'vue'
import Clipboard from 'clipboard'

export default function(text, event, callback) {
  const clipboard = new Clipboard(event.currentTarget, {
    text: () => text
  })
  clipboard.on('success', () => {
    Vue.prototype.$message({
      message: 'Copy successfully',
      type: 'success',
      duration: 1500
    })
    if (callback && typeof callback === 'function') callback()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    Vue.prototype.$message({
      message: 'Copy failed',
      type: 'error'
    })
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
