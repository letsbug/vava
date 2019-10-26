import Request from '@/utils/request';

export const apiList = (page: number, limit: number, title?: string, level?: number, status?: number) => {
  const params = { page, limit, title, level, status };
  return Request.get('/articles', { params });
};

export const apiDetail = (id: string) => {
  const params = { id };
  return Request.get('/articles/detail', { params: params });
};

export const apiUpdate = (params: any) => {
  return Request.post('/articles/update', params);
};

export const apiUpdates = (lst: any[]) => {
  return Request.post('/articles/batch', lst);
};

export const apiAuditors = () => {
  return Request.post('/account/auditors');
};
