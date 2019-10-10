import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IStoreUser } from '@/store/modules/user';
import { getUserToken } from '@/utils/cookies';
import { Message, MessageBox } from 'element-ui';

export const statusMap: { [key: string]: string } = {
  400: '请求非法，请联系系统管理员！',
  401: '您的登录已过期，请重新登录！',
  403: '拒绝访问，您没有相应权限！',
  500: '服务器异常，请稍后再试！',
  502: '服务器内部错误，请联系系统管理员！'
};

const friendlyErrors = (error: AxiosError) => {
  // for debug
  console.error('response error: ', error.code, error);

  if (error.toString().includes('Error: timeout')) {
    Message.error('请求超时，请检查网络，稍后再试！');
    return;
  }

  const { response } = error;
  if (!response) {
    Message.error('无法连接服务器！');
    return;
  }
  const { status } = response;
  if (status === 401 && IStoreUser.phone) {
    onAccessExpired();
    return;
  }

  Message.error(statusMap[response.status]);
};

const onAccessExpired = () => {
  MessageBox.confirm(statusMap[401], '确认登出', {
    confirmButtonText: '确认登出',
    cancelButtonText: '留在该页面',
    type: 'warning'
  }).then(async () => {
    await IStoreUser.ClearToken();
    location.reload();
  });
};

const Request = Axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  timeout: 6000
});

// request interceptor
Request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (IStoreUser.token) {
      config.headers['X-Token'] = getUserToken();
    }
    return config;
  },
  (err: AxiosError) => Promise.reject(err)
);

// response interceptor
Request.interceptors.response.use(
  (res: AxiosResponse) => {
    const { status, data } = res;
    if (status >= 200 && status < 400) {
      return data;
    }
    const { message } = data;
    Message.error(message || 'Api response an unknown error');
    return Promise.reject(new Error(message || 'Api response an unknown error'));
  },
  (err: AxiosError) => {
    friendlyErrors(err);
    return Promise.reject(err);
  }
);

export default Request;
