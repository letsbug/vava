import Mock from 'mockjs'
import { userList } from './users'
import ArticleVo from '../src/vo/ArticleVo'
import BaseVo from '../src/vo/BaseVo'
import { generateResponse } from './response'

const list = []
const total = 100
const _userList = userList.map(v => v.nickname)
const hasAuditUsers = userList.filter(v => {
  return !v.roles.includes('Editor') && !v.roles.includes('Visitor') && !v.roles.includes('UserManager')
}).map(v => v.nickname)

const contents = cn => cn ? Mock.Random.cparagraph() : Mock.Random.paragraph()

const random = cn => Mock.mock({
  id: '@increment',
  timestamp: +Mock.Random.date('T'),
  'author|1': _userList,
  'auditor|1': hasAuditUsers,
  title: cn ? '@ctitle(5, 20)' : '@title(5, 20)',
  summery: cn ? '@cparagraph(1, 2)' : '@paragraph(1, 2)',
  content: '<p>' + contents(cn) + '</p>',
  level: '@integer(1, 5)',
  'status|1': ['draft', 'committed', 'failing', 'auditing', 'audited', 'deleted'],
  display: +Mock.Random.datetime('T'),
  pv: '@integer(100, 29999)',
  'origin|1': ['@platform-a', '@platform-b', '@platform-c', '@platform-d']
})

function generateDatas() {
  for (let i = 0; i < total; i++) {
    list.push(new ArticleVo(random(false)))
  }
}

export default [
  {
    url: '/articles/list',
    type: 'post',
    response: config => {
      if (list.length < 1) {
        generateDatas()
      }

      const { title, level, status, page, size } = config.body

      const _list = (!title && !level && !status)
        ? [...list]
        : list.filter(v => {
          let is = true
          if (title) is = v.title.includes(title)
          if (level) is = v.level === level
          if (status) is = v.status === status
          return is
        })
      const total = _list.length

      const vo = new BaseVo({ page, size, total })

      const min = (vo.page - 1) * vo.size
      const max = vo.page * vo.size

      return generateResponse(2000, _list.filter((v, i) => (i >= min && i < max)), vo)
    }
  },
  {
    url: '/articles/detail',
    type: 'get',
    response: config => {
      const { id } = config.query

      return generateResponse(2000, list.filter(v => v.id === id))
    }
  },
  {
    url: '/articles/create',
    type: 'post',
    response: () => {
      return generateResponse(2000)
    }
  },
  {
    url: '/articles/update',
    type: 'post',
    response: config => {
      const params = config.body
      if (!params.id) {
        return generateResponse(5001)
      }

      let modified = false
      for (const i in list) {
        if (list[i].id === params.id) {
          Object.keys(params).forEach(key => {
            list[i][key] = params[key]
          })
          modified = true
          break
        }
      }

      const status = modified ? 2000 : 5000

      return generateResponse(status)
    }
  },
  {
    url: '/articles/batch',
    type: 'post',
    response: config => {
      const lst = config.body
      list.forEach((v, i) => {
        lst.forEach(p => {
          if (v.id === p.id) {
            Object.keys(p).forEach(key => {
              list[i][key] = p[key]
            })
          }
        })
      })
      return generateResponse(2000)
    }
  }
]
