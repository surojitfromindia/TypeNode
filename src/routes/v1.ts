import { Router } from 'express';
import { Request, Response } from 'express';
import { router as ShopRoute } from './v1/shops';
import { router as FileRoute } from './v1/files';
import { router as ProductRoute } from './v1/products';

const router: Router = Router({ caseSensitive: true });

//get test
router.get('/', (_req: Request, res: Response) => {
  res.status(200).send('API v1');
});

//post test
router.post('/json_test', (req: Request, res) => {
  const json_body = req.body;
  res.status(200).send(json_body);
});

router.use('/shops', ShopRoute);
router.use('/files', FileRoute);
router.use('/products', ProductRoute);

router.all('/*', (_req: Request, res) => {
  res.status(404).send('Not Found');
});

export { router };
