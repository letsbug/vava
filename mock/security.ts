import { Response, Request, NextFunction } from 'express';
import { IResponses } from './response';

export const accessTokenAuth = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.header('X-Access-Token');
  if (!accessToken) {
    const ires = IResponses.STATUS_TOKEN_INVALID;
    return res.status(ires.status).json(ires);
  }
  next();
};
