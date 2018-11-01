import Mock from 'mockjs'
import Account from './account'
import Notification from './notification'
import Contacts from './contacts'

Mock.setup({ timeout: '400-800' })

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
