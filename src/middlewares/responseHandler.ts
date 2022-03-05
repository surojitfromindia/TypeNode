import { NextFunction, Request, Response } from 'express';
import { ILogger } from 'src/Interface/ILogger';

type ResponseBody = {
  responseBody?: any;
  logs?: [ILogger];
  status: number;
  success: boolean;
};
const responseHandler = (_req: any, res: Response) => {
  let response: ResponseBody = {
    status: res.locals.status,
    success: true,
  };
  if (res.hasOwnProperty('responseBody')) {
    response.responseBody = res.responseBody;
  }
  if (res.hasOwnProperty('logs')) {
    response.logs = res.logs;
  }
  res.json(response);
};
export { responseHandler };
