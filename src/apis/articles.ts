import Service from '@/utils/request';

export const apiList = (page: number, size: number, title?: string, level?: number, status?: number) => {
  const params = { page, size, title, level, status };
  return Service.post('/articles/list', params);
};

export const apiDetail = (id: string) => {
  const params = { id };
  return Service.get('/articles/detail', { params: params });
};

export const apiUpdate = (params: any) => {
  return Service.post('/articles/update', params);
};

export const apiUpdates = (lst: any) => {
  return Service.post('/articles/batch', lst);
};

export const apiAuditors = () => {
  return Service.post('/account/auditors');
};
