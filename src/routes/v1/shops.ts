//api route for shop infomation
import { Router } from 'express';
import { getAllShops, createShop, getShop, getSubShops } from '../../controllers/v1/shops';
import { validatePayload } from '../../middlewares/validationPayload';
import { activityLogger } from '../../middlewares/activityLogger';
import { responseHandler } from '../../middlewares/responseHandler';
import { shopSchema } from '../../validation/index';
import { LogModel } from '../../models/Logger';
import { LoggerAction } from '../../Interface/ILogger';

const router: Router = Router({ caseSensitive: true });

router.get('/', getAllShops);
router.post(
  '/',
  validatePayload(shopSchema),
  createShop,
  activityLogger(LogModel, { message: 'Shops created', action: LoggerAction.CREATE }),
  responseHandler
);
router.get('/:shop_uid', getShop, responseHandler);
router.get('/:shop_uid/sub_shops', getSubShops('multiple'), responseHandler);
router.get('/:shop_uid/sub_shops/:sub_shop_uid', getSubShops('single'), responseHandler);

export { router };
