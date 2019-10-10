import Service from '@/utils/request';

export const apiNotificationList = () => {
  return Service.post('/notification/list');
};

export const apiNotificationRead = (ids: string) => {
  const data = { ids };
  return Service.post('/notification/read', data);
};

export const apiNotificationReadAll = () => {
  return Service.post('/notification/allread');
};
