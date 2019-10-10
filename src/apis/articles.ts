import Service from '@/utils/request';

export const list = (page: number, size: number, title: string, level: number, status: number) => {
  const params = { page, size, title, level, status };
  return Service.post('/articles/list', params);
};

export const detail = (id: string) => {
  const params = { id };
  return Service.get('/articles/detail', { params: params });
};

export const update = (params: any) => {
  return Service.post('/articles/update', params);
};

export const updates = (lst: any) => {
  return Service.post('/articles/batch', lst);
};

export const auditors = () => {
  return Service.post('/account/auditors');
};
