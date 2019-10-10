import Request from '@/utils/request';

export function histories() {
  return Request.get('/articles/history');
}
