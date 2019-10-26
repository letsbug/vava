import { Response, Request } from 'express';
import { IResponses } from '../response';
import { ITypeStatistics, ITypeStatisticsBasic, ITypeStatisticsArea } from '@/apis/types';
import { generatePV, generateAreas } from './pv-generator';

const count = 365;
const pageViews: ITypeStatisticsBasic[] = [];

const oneDay = 24 * 3600 * 1000;
let now = new Date().getTime();

for (let i = 0; i < count; i++) {
  if (i > 0) now -= oneDay;
  pageViews.push(generatePV(now));
}

const beforeFilter = (req: Request) => {
  let { start, end } = req.query;
  if (!start || !end) {
    end = new Date().getTime();
    start = new Date().getTime() - oneDay * 30;
  }
  return { start, end };
};

export const getPageViews = (req: Request, res: Response) => {
  let { start, end } = beforeFilter(req);

  let totalPv = 0;
  const data = pageViews.filter(v => {
    totalPv += v.pv;
    return v.date >= start && v.date <= end;
  });
  const areas = generateAreas(totalPv);

  const _res = IResponses.STATUS_SUCCESS;
  _res.data = { basic: data, areas } as ITypeStatistics;
  _res.page = undefined;

  return res.json(_res);
};

export const getAgesCounts = (req: Request, res: Response) => {};
