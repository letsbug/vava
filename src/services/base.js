import Axios from 'axios'
import store from '@/store'
import { Token } from '@/tools'
import { Message } from 'element-ui'

const Service = Axios.create({ baseURL: process.env.BABEL_ENV, timeout: 6000 })

Service.interceptors.request.use(
  config => {
    if (store.getters.token) Service.defaults.headers['X-Token'] = Token.get()
    return config
  },
  err => Promise.reject(err)
)

Service.interceptors.response.use(
  res => res,
  err => {
    console.log('response ', err)
    Message.error(err.message)
    return Promise.reject(err)
  }
)

export default Service
