import Mock from 'mockjs'
import { parseURL } from '../src/tools/urls'

import Roles from './roles'
import Users from './users'
import Notification from './notification'
import Contacts from './contacts'
import Article from './article'
import PaintedFace from './painted-face'
import Statistics from './statistics'

const mocks = [
  ...Roles,
  ...Users,
  ...Notification,
  ...Contacts,
  ...Article,
  ...PaintedFace,
  ...Statistics
]

// 用于前台模拟
// 它会重新定义XMLHttpRequest，
// 这将导致许多第三方库失效(比如进度事件)。
export function mockXHR() {
  // 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  if (process.env.NODE_ENV === 'development') {
    Mock.setup({ timeout: '400-4000' })
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: parseURL(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

// for mock server
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`/mock${url}`),
    type: type || 'get',
    response(req, res) {
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

export default mocks.map(route => {
  return responseFake(route.url, route.type, route.response)
})
