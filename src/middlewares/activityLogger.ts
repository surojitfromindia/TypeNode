//run this middleware after data is successfully saved to database

import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import { ILogger } from 'src/Interface/ILogger';

const activityLogger =
  (model: Model<ILogger>, log: ILogger) => async (req: Request, res: Response, next: NextFunction) => {
    const activityLogged = await model.create(log);
    res.logs = [activityLogged];
    next();
  };

export { activityLogger };
