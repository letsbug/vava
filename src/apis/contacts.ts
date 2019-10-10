import api from '@/utils/request';

export const apiList = (pages: any) => {
  return api.post('/contacts/list', pages);
};

export const apiAll = () => {
  return api.post('/contacts/all');
};
