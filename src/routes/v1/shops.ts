//api route for shop infomation
import { Router } from 'express';
import { getAllShops, createShop } from '../../controllers/v1/shops';
import { validatePayload } from '../../middlewares/validationPayload';
import { shopSchema } from '../../validation/shop';

const router: Router = Router({ caseSensitive: true });

//verb : 'GET'
//visiability : 'public'
//path : '/v1/shops'
router.get('/', getAllShops);
router.post('/', validatePayload(shopSchema), createShop);

export { router };
