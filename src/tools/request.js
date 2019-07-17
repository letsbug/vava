import Axios from 'axios'
import store from '@/store'
import { Token } from '@/tools'
import { Message } from 'element-ui'

const Service = Axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 6000
})

// request interceptor
Service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = Token.get()
    }
    return config
  },
  err => Promise.reject(err)
)

// response interceptor
Service.interceptors.response.use(
  res => {
    const { data } = res
    // TODO HTTP请求异常处理（非后端自定义异常）

    return data
  },
  err => {
    Message.error(err.message)
    return Promise.reject(err)
  }
)

export default Service
