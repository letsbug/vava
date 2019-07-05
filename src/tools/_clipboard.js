import { Message } from 'element-ui'
import Clipboard from 'clipboard'

export default (text, event, callback) => {
  const clipboard = new Clipboard(event.currentTarget, {
    text: () => text
  })
  clipboard.on('success', () => {
    Message.success('Copy successfully')
    if (callback && typeof callback === 'function') {
      callback()
    }
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    Message.error('Copy failed')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
