//api route for shop infomation
import { Router } from 'express';
import { createProduct } from '../../controllers/v1/products';
import { activityLogger } from '../../middlewares/activityLogger';
import { responseHandler } from '../../middlewares/responseHandler';
import { LogModel } from '../../models/Logger';
import { LoggerAction } from '../../Interface/ILogger';

const router: Router = Router({ caseSensitive: true });

router.post(
  '/',
  createProduct,
  activityLogger(LogModel, { message: 'Products created', action: LoggerAction.CREATE }),
  responseHandler
);

export { router };
