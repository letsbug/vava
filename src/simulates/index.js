import Mock from 'mockjs'
import Account from './account'

// About account apis
Mock.mock(/\/account\/login/, 'post', Account.login)
Mock.mock(/\/account\/logout/, 'post', Account.logout)
Mock.mock(/\/account\/info/, 'get', Account.info)
