/**
 * index.
 * @author: gzb
 * @date: 2018-06-17 16:02
 */

import Mock from 'mockjs'
import loginApi from './login'

// about login
Mock.mock(/\/login\/login/, 'post', loginApi.login)
Mock.mock(/\/login\/logout/, 'post', loginApi.logout)
Mock.mock(/\/login\/info\.*/, 'get', loginApi.information)

export default Mock
