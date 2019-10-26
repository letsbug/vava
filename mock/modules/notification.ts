import faker from 'faker';
import { Response, Request } from 'express';
import { IResponses } from '../response';
import { ITypeNotification } from '@/apis/types';

const notifications: ITypeNotification[] = [];
const total = 40;

const random = (index: number) => ({
  id: index,
  title: faker.lorem.sentence(6, 10),
  timestamp: faker.date.past().getTime(),
  isUnread: faker.random.boolean(),
  from: faker.random.arrayElement(['system', 'user-a', 'user-b', 'user-c'])
});

for (let i = 0; i < total; i++) {
  notifications.push(random(i));
}

export const getNotificationsUnreadCount = (req: Request, res: Response) => {
  const count = notifications.filter(v => v.isUnread);

  const _res = IResponses.STATUS_SUCCESS;
  _res.data = count;
  return res.json(_res);
};

export const getNotifications = (req: Request, res: Response) => {
  const { page, limit } = req.query;
  const list = notifications.filter((v, i) => i < page * limit && i >= limit * (page - 1));

  const _res = IResponses.STATUS_SUCCESS;
  _res.data = list;
  _res.page = { page, limit, total };
  return res.json(_res);
};

export const getNotification = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    const obj = IResponses.STATUS_WRONG_PARAMS;
    return res.status(obj.status).json(obj);
  }

  const _res = IResponses.STATUS_SUCCESS;
  _res.data = notifications.find(v => v.id === id);
  return res.json(_res);
};

export const notificationReadAll = (req: Request, res: Response) => {
  notifications.forEach(v => (v.isUnread = false));

  return res.json(IResponses.STATUS_SUCCESS);
};
