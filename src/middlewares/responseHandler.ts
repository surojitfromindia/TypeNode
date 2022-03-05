import { NextFunction, Request, Response } from 'express';

const responseHandler = (_req: any, res: Response) => {
  let responseBody = {};
  if (res.hasOwnProperty('responseBody')) {
    responseBody = res.responseBody;
  }
  res.json(responseBody);
};
export { responseHandler };
