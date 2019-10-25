import { Request, Response } from 'express';
import { IResponses } from '../response';
import { generatePV, generateAreas, generateAges, generateTraffics } from './pv-generator';

const count = 365 * 2; // 2 years
const pageViews: any = [];

const oneDay = 24 * 3600 * 1000;
let now = new Date().getTime();

for (let i = 0; i < count; i++) {
  if (i > 0) now -= oneDay;
  pageViews.push(generatePV(now));
}

const isInRange = (start: number, end: number, curr: number) => {
  return curr >= start && curr <= end;
};
const convertParams = (req: Request) => {
  let { start, end } = req.body;

  if (!start || !end) {
    end = new Date().getTime();
    start = new Date().getTime() - oneDay * 30;
  }

  return { start, end };
};

export const getTotalCounts = (req: Request, res: Response) => {
  const { start, end } = convertParams(req);
  let pv = 0;
  let uv = 0;
  let cvr = 0;

  pageViews.forEach((v: any) => {
    if (isInRange(start, end, v.date)) {
      pv += v.pv;
      uv += v.uv;
      cvr += v.cvr;
    }
  });

  const _res = IResponses.STATUS_SUCCESS;
  _res.data = { pv, uv, cvr };
  return res.json(_res);
};

export const getPageviews = (req: Request, res: Response) => {
  const { start, end } = convertParams(req);

  const data = pageViews.filter((v: any) => {
    return isInRange(start, end, v.date);
  });

  // const areas = generateAreas(totalPV);
  // const ages = generateAges(totalUV);
  // const traffics = generateTraffics(totalPV);

  const _res = IResponses.STATUS_SUCCESS;
  _res.data = data;

  return res.json(_res);
};
