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
router.get('/chuncked', chunckedResponse);

router.all('/*', (_req: Request, res) => {
  res.status(404).send('Not Found');
});

function chunckedResponse(req: Request, res: Response) {
  const a_line = 'A apple is a fruit'.split(' ');
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Transfer-Encoding': 'chunked',
  });

  let t=500;
 
  for(const i of a_line) {
    t=t+500;
    setTimeout(() => {
      res.write(`${i}\n`)
    }, t);
  }``

  setTimeout(() => {
    res.end("--end");
  },6000)
}

export { router };
