//api route for shop infomation
import { Router } from 'express';
import { getAllShops, createShop } from '../../controllers/v1/shops';
import { validatePayload } from '../../middlewares/validationPayload';
import { activityLogger } from '../../middlewares/activityLogger';
import { responseHandler } from '../../middlewares/responseHandler';
import { shopSchema } from '../../validation/index';
import { LogModel } from '../../models/Logger';

const router: Router = Router({ caseSensitive: true });

router.get('/', getAllShops);
router.post(
  '/',
  validatePayload(shopSchema),
  createShop,
  activityLogger(LogModel, { message: 'Shops created', action: 'create' }),
  responseHandler
);

export { router };
