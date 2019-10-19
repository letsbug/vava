export const index = ['admin', 'assigner', 'auditor', 'editor', 'visitor'];

export default [
  {
    url: '/account/roles',
    type: 'get',
    response: () => {
      return {
        status: 2000,
        success: true,
        message: 'success',
        data: index
      };
    }
  }
];
