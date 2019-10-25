import Request from '@/utils/request';

export const apiContactList = (pages: any) => {
  return Request.post('/contacts/list', pages);
};

export const apiContactAll = () => {
  return Request.post('/contacts/all');
};
