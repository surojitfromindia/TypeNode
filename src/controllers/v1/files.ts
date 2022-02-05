import { asyncWrapper } from '../../middlewares/asyncWrapper';
import { Request, Response } from 'express';
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
