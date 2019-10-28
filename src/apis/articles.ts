import Request from '@/utils/request';

export const apiList = (page: number, limit: number, title?: string, author?: string, status?: number) => {
  const params = { page, limit, title, author, status };
  return Request.get('/articles', { params });
};

export const apiDetail = (id: string | number) => {
  return Request.get(`/articles/${id}`);
};

export const apiUpdate = (id: string | number, title: string) => {
  return Request.put(`/articles/${id}`, { title });
};

export const apiUpdates = (lst: any[]) => {
  return Request.post('/articles/batch', lst);
};
