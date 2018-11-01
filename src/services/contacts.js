import api from './base'

export const contacts = () => {
  return api.post('/contacts/list').then(res => res.data)
}
