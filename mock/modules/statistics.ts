import { Request, Response } from 'express';
import { IResponses } from '../response';
import { parseTimeGap, parseDate } from '@/utils/datetime';
import { generatePV, generateAreas, generateAges, generateTraffics } from './pv-generator';

const count = 365 * 2; // 2 years
const pv: any = [];

const oneDay = 24 * 3600 * 1000;
let now = new Date().getTime();

function isInRange(start: number, end: number, curr: Date) {
  curr = new Date(curr);
  return curr >= new Date(start) && curr <= new Date(end);
}

for (let i = 0; i < count; i++) {
  if (i > 0) now -= oneDay;

  const _date = parseDate(now, 'yyyy-MM-dd');

  pv.push(generatePV(_date!));
}

export const getPageViews = (req: Request, res: Response) => {
  let { start, end } = req.body;

  if (!start || !end) {
    end = parseDate(new Date(), 'yyyy-MM-dd');
    start = parseDate(new Date().getTime() - oneDay * 30, 'yyyy-MM-dd');
  }

  let totalPV = 0;
  let totalUV = 0;
  let averageCVR = 0;
  const data = pv.filter((v: any) => {
    const _is = isInRange(start, end, v.date);
    if (_is) {
      totalPV += v.pv;
      totalUV += v.uv;
      averageCVR += v.cvr;
    }
    return _is;
  });

  const _days = (new Date(end).getTime() - new Date(start).getTime()) / oneDay;
  const averagePV = Math.floor(totalPV / _days);
  const averageUV = Math.floor(totalUV / _days);
  averageCVR = +(averageCVR / _days).toFixed(4);
  const areas = generateAreas(totalPV);
  const ages = generateAges(totalUV);
  const traffics = generateTraffics(totalPV);

  const _res = IResponses.STATUS_SUCCESS;
  _res.data = {
    totalPV,
    totalUV,
    averagePV,
    averageUV,
    averageCVR,
    areas,
    ages,
    data,
    traffics
  };

  return res.json(_res);
};
