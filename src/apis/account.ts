import Request from '@/utils/request';

export const apiLogin = (username: string, password: string) => {
  const data = { username, password };
  return Request.post('/users/login', data);
};

export const apiLogout = () => {
  return Request.get('/users/logout');
};

export const apiUserInfo = (username: string) => {
  return Request.post('/users/info');
};

export const apiUserMocks = () => {
  return Request.get('/users');
};
