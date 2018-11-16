import { Message } from 'element-ui'
import Clipboard from 'clipboard'

export default (text, event, callback) => {
  const clipboard = new Clipboard(event.currentTarget, {
    text: () => text
  })
  clipboard.on('success', () => {
    Message.success('Copy successfully')
    if (callback && typeof callback === 'function') callback()
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    Message.error('Copy failed')
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
