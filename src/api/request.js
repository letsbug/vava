/**
 * request.
 * @author: gzb
 * @date: 2018-06-17 02:58
 */

import axios from 'axios'
import store from '@/store'

import { Token } from '@/utilities'
import { Message } from 'element-ui'

const service = axios.create({ baseURL: process.env.BASE_API, timeout: 6000 })

// request interceptor
service.interceptors.request.use(
  config => {
    // Let all request carry token, ['X-Token'] is custom key.
    if (store.getters.token) service.defaults.headers['X-Token'] = Token.get()
    return config
  }, error => Promise.reject(error)
)

// response interceptor
service.interceptors.response.use(
  response => response,
  error => {
    console.log('response' + error) // for debug
    Message({ message: error.message, type: 'error', duration: 5 * 1000 }) // for user
    return Promise.reject(error)
  }
)

export default service
