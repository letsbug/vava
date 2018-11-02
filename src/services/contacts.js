import api from './base'

export const contacts = pages => {
  return api.post('/contacts/list', pages).then(res => res.data)
}
