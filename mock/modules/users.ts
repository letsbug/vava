import faker from 'faker';
import { Request, Response } from 'express';
import { IResponses } from '../response';
import { ITypeUser } from '@/apis/types';

export const userList: ITypeUser[] = [];
const count = 20;
const roles = ['SuperAdmin', 'AccessManager', 'UserManager', 'ProManager', 'Auditor', 'Editor'];
const passwordPreset = 'a12345678';

function generateUser(index: number) {
  const phone = faker.phone.phoneNumber();
  const nickname = faker.name.findName();
  const avatar = index < roles.length ? `./assets/img/avatars/${index}.gif` : undefined;

  return {
    id: index,
    username: phone,
    password: passwordPreset,
    token: 'Token-' + nickname,
    roles: index < roles.length ? [roles[index]] : ['Visitor'],
    nickname,
    phone,
    email: faker.internet.email(),
    qq: faker.random.number({ min: 100000000, max: 20000000000 }),
    avatar,
    sex: faker.random.arrayElement([0, 1]), // 0: female, 1: male
    intro: faker.lorem.sentence(6, 10)
  };
}

for (let i = 0; i < roles.length; i++) {
  userList.push(generateUser(i));
}

for (let i = roles.length; i < count; i++) {
  userList.push(generateUser(i));
}

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = userList.find(u => u.username === username);

  if (!user || password !== passwordPreset) {
    const obj = IResponses.STATUS_WRONG_USER;
    return res.status(obj.status).json(obj);
  }

  const _res = IResponses.STATUS_SUCCESS;
  _res.data = {
    accessToken: user.token
  };
  return res.json(_res);
};

export const logout = (req: Request, res: Response) => {
  return res.json(IResponses.STATUS_SUCCESS);
};

export const getUsers = (req: Request, res: Response) => {
  let { phone, nickname } = req.query;
  nickname = nickname.toLowerCase();
  const list = userList.filter(u => {
    const nick = u.nickname;
    return phone === u.phone && (nick ? nick.toLowerCase().includes(nickname) : false);
  });

  const _res = IResponses.STATUS_SUCCESS;
  _res.data = list;
  return res.json(res);
};

export const getMeInfo = (req: Request, res: Response) => {
  const token = req.header('X-Access-Token');
  const info = userList.find(u => u.token === token);

  const _res = IResponses.STATUS_SUCCESS;
  _res.data = info;

  return res.json(_res);
};

export const updateUser = (req: Request, res: Response) => {
  return res.json(IResponses.STATUS_SUCCESS);
};

export const deleteUser = (req: Request, res: Response) => {
  return res.json(IResponses.STATUS_SUCCESS);
};
