//api route for shop infomation
import { Router } from 'express';
import { getAllShops, createShop } from '../../controllers/v1/shops';
import { validatePayload } from '../../middlewares/validationPayload';
import { responseHandler} from "../../middlewares/responseHandler"
import { shopSchema } from '../../validation/index';

const router: Router = Router({ caseSensitive: true });

router.get('/', getAllShops);
router.post('/', validatePayload(shopSchema), createShop, responseHandler);

export { router };
