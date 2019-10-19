export interface IResponseType {
  status: number;
  success: boolean;
  message: string;
  data?: any;
  page?: any;
}

export interface IResponseStatus {
  STATUS_SUCCESS: IResponseType;
  STATUS_WRONG_USER: IResponseType;
  STATUS_TOKEN_INVALID: IResponseType;
  STATUS_UNKNOWN_ERROR: IResponseType;
  STATUS_WRONG_PARAMS: IResponseType;
  STATUS_EXISTS: IResponseType;
  STATUS_NOT_FIND: IResponseType;
}

export const IResponses: IResponseStatus = {
  STATUS_SUCCESS: {
    status: 200,
    success: true,
    message: 'Success'
  },
  STATUS_WRONG_USER: {
    status: 400,
    success: false,
    message: 'Account and password are incorrect.'
  },
  STATUS_TOKEN_INVALID: {
    status: 401,
    success: false,
    message: 'Invalid Access Token.'
  },
  STATUS_UNKNOWN_ERROR: {
    status: 500,
    success: false,
    message: 'Unknown error on server.'
  },
  STATUS_WRONG_PARAMS: {
    status: 501,
    success: false,
    message: 'Missing the necessary fields.'
  },
  STATUS_EXISTS: {
    status: 502,
    success: false,
    message: 'The data you want to add already exists.'
  },
  STATUS_NOT_FIND: {
    status: 503,
    success: false,
    message: 'The data you want to modify does not exist.'
  }
};
