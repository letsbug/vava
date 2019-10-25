import Request from '@/utils/request';

export const getPaveViews = (start?: number, end?: number) => {
  const params = { start, end };
  return Request.get('/pageviews', { params });
};
