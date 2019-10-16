import Request from '@/utils/request';

const orgs = (parentId?: string) => {
  return Request.post('/organization/list', { parentId });
};

const orgUpdate = (parentId: string, name: string, id: string) => {
  const datas = { name };
  return Request.post('/organization/update', { id, parentId, datas });
};

const orgAdd = (parentId: string, name: string) => {
  const datas = { name };
  return Request.post('/organization/add', { parentId, datas });
};

const orgDelete = (id: string, parentId: string) => {
  return Request.post('/organization/delete', { id, parentId });
};

const ranks = (orgId: string, parentId?: string) => {
  return Request.post('/department/list', { orgId, parentId });
};

const rankUpdate = (parentId: string, name: string, id: string, orgId: string) => {
  return Request.post('/department/update', { id, orgId, name });
};

const rankAdd = (parentId: string, name: string, id: string, orgId: string) => {
  return Request.post('/department/add', { orgId, parentId, name });
};

const rankDelete = (orgId: string, parentId: string, id: string) => {
  return Request.post('/department/delete', { orgId, parentId, id });
};
