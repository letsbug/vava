import Mock from 'mockjs'
import Account from './account'
import Notification from './notification'
import Contacts from './contacts'

Mock.setup({ timeout: '400-1000' })

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

// About account apis
Mock.mock(/\/account\/login/, 'post', Account.login)
Mock.mock(/\/account\/logout/, 'post', Account.logout)
Mock.mock(/\/account\/info/, 'get', Account.info)
Mock.mock(/\/account\/update/, 'get', Account.update)

// About notifications
Mock.mock(/\/notification\/list/, 'post', Notification.list)
Mock.mock(/\/notification\/read/, 'post', Notification.read)
Mock.mock(/\/notification\/allread/, 'post', Notification.readall)

// About contacts
Mock.mock(/\/contacts\/list/, 'post', Contacts.list)
Mock.mock(/\/contacts\/all/, 'post', Contacts.all)

// About articles
Mock.mock(/\/articles\/list/, 'post', Contacts.all)
Mock.mock(/\/articles\/detail/, 'post', Contacts.all)
Mock.mock(/\/articles\/create/, 'post', Contacts.all)
Mock.mock(/\/articles\/update/, 'post', Contacts.all)
