import Request from '@/utils/request';

export const getPaveViews = (start?: string | number, end?: string | number) => {
  const params = { start, end };
  return Request.post('/statistics/pv', params);
};
