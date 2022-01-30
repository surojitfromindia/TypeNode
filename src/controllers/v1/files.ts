import { asyncWrapper } from '../../middlewares/asyncWrapper';
import { Request, Response } from 'express';
import { ErrorResponse } from '../../middlewares/errorHandler';
import { ShopModel, Shop } from '../../models/Shops';
import { unqiueNumber } from '../../models/Static';
import { successResponse } from '../../class/Response';
import mongoose, { Types } from 'mongoose';
import { serverHugeFile } from '../../utils/File/serverfile';

const downloadFile = asyncWrapper(
  async (_req: Request, res: Response, next) => {
    try {
      await serverHugeFile('abc.txt', res);
      
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

export { downloadFile };
