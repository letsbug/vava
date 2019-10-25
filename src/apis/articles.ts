import Request from '@/utils/request';

export const apiList = (page: number, size: number, title?: string, level?: number, status?: number) => {
  const params = { page, size, title, level, status };
  return Request.post('/articles/list', params);
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
