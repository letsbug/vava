import Service from '@/utils/request';

export const pv = (start: string | number, end?: string | number) => {
  const params = { start, end };
  return Service.post('/statistics/pv', params);
};
