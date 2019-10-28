import faker from 'faker';
import { Request, Response } from 'express';
import { IResponses } from '../response';
import { ITypeArticle } from '@/apis/types';
import Dictionary from './dictionaries';

const articles: ITypeArticle[] = [];
const total = 103;
const editors = Dictionary.username;
const auditor = 'John';

const randomParagraph = (): string => {
  const count = faker.random.number({ min: 5, max: 10 });
  let paragraphs: string = '';
  for (let i = 0; i < count; i++) {
    paragraphs += `<p>${faker.lorem.paragraphs()}</p>`;
  }
  return paragraphs;
};

const random = (index: number): ITypeArticle => {
  const status = faker.random.arrayElement([0, 1, 2, 3, 4, 5]);
  return {
    id: index,
    timestamp: faker.date.past().getTime(),
    author: faker.random.arrayElement(editors),
    auditor: status === 4 ? auditor : undefined,
    title: faker.lorem.sentence(6, 10),
    summery: faker.lorem.sentences(2),
    content: randomParagraph(),
    status: status,
    source: faker.random.arrayElement(['platform-a', 'platform-b', 'platform-c', 'platform-d']),
    pageviews: status === 4 ? faker.random.number({ min: 100, max: 29999 }) : undefined
  };
};

for (let i = 0; i < total; i++) {
  articles.push(random(i));
}

export const getArticles = (req: Request, res: Response) => {
  let { title, status, author, page, limit } = req.query;
  page = page || 1;
  limit = limit || 20;

  let list = articles.filter(v => {
    if (title && !v.title.includes(title)) {
      return false;
    }
    if (status && v.status !== +status) {
      return false;
    }
    return !(author && !v.author.includes(author));
  });
  const total = list.length;

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
  _res.data = articles.find(v => v.id === parseInt(id));
  _res.page = undefined;
  return res.json(_res);
};

export const createArticle = (req: Request, res: Response) => {
  return res.json(IResponses.STATUS_SUCCESS);
};

export const updateArticle = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  console.log(id, title);

  if (!id) {
    const obj = IResponses.STATUS_WRONG_PARAMS;
    return res.status(obj.status).json(obj);
  }

  const _res = IResponses.STATUS_SUCCESS;
  _res.page = undefined;
  _res.data = undefined;
  return res.json(IResponses.STATUS_SUCCESS);
};
