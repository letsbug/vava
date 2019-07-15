const statusList = {
  2000: {
    status: 2000,
    success: true,
    message: 'Success'
  },
  4000: {
    status: 4000,
    success: false,
    message: 'Account and password are incorrect.'
  },
  4001: {
    status: 4001,
    success: false,
    message: 'Login failed, unable to get user details.'
  },
  5000: {
    status: 5000,
    success: false,
    message: 'Unknown error on server.'
  },
  5001: {
    status: 5001,
    success: false,
    message: 'Missing the necessary fields.'
  }
}

export function generateResponse(status = 2000, data = null, pages = null) {
  const obj = statusList[status]

  return data ? Object.assign({}, obj, { data, pages }) : obj
}
