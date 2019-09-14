import Service from '@/tools/request'

export function histories() {
  return Service.get('/articles/history')
}
