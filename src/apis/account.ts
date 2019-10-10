import Request from '@/utils/request';

export const apiLogin = (username: string, password: string) => {
  const data = { username, password };
  return Request.post('/account/login', data);
};

export const apiLogout = () => {
  return Request.post('/account/logout');
};

export const apiUserInfo = () => {
  return Request.get('/account/info');
};

export const apiUserMocks = () => {
  return Request.get('/account/mocks');
};

export const apiUserList = () => {
  return Request.get('/account/list');
};
