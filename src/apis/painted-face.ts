import Request from '@/utils/request';

export function apiHistories(id: string | number) {
  return Request.get(`/articles/histories/${id}`);
}
