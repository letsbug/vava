import Request from '@/utils/request';

export const apiNotificationList = (page: number, limit: number) => {
  const params = { page, limit };
  return Request.get('/notifications', { params });
};

export const apiNotificationRead = (ids: string) => {
  const data = { ids };
  return Request.post('/notification/read', data);
};

export const apiNotificationReadAll = () => {
  return Request.post('/notification/allread');
};
