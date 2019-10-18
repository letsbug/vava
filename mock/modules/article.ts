import faker from 'faker';
import { Request, Response } from 'express';
import { IResponses } from '../response';
import { ITypeArticle } from '../../src/types';
import { userList } from './users';

const articles: ITypeArticle[] = [];
const total = 103;
const editor = userList.find(v => v.roles.includes('Editor'));
const auditor = userList.find(v => v.roles.includes('Auditor'));

const random = (index: number) => ({
  id: '@increment',
  timestamp: faker.date.past().getTime(),
  author: editor!.nickname!,
  auditor: auditor!.username,
  title: faker.lorem.sentence(6, 10),
  summery: faker.lorem.sentences(2),
  content: '<p>' + faker.lorem.paragraphs(5) + '</p>',
  status: faker.random.arrayElement([0, 1, 2, 3, 4, 5]),
  source: faker.random.arrayElement(['platform-a', 'platform-b', 'platform-c', 'platform-d']),
  pageviews: faker.random.number({ min: 100, max: 29999 })
});

for (let i = 0; i < total; i++) {
  articles.push(random(i));
}

export const getArticles = (req: Request, res: Response) => {
  const { title, page, limit } = req.query;

  let list = articles.filter(v => {
    return !(title && !v.title.includes(title));
  });
  list = list.filter((v, i) => i < limit * page && i >= limit * (page - 1));

  const _res = IResponses.STATUS_SUCCESS;
  _res.data = list;
  _res.page = { page, limit, total };
  return res.json(_res);
};

export const getArticle = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    const obj = IResponses.STATUS_WRONG_PARAMS;
    return res.status(obj.status).json(obj);
  }

  const _res = IResponses.STATUS_SUCCESS;
  _res.data = articles.find(v => v.id === id);
  return res.json(_res);
};
