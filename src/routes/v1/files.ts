//api route for shop infomation
import { Router } from 'express';
import { downloadFile } from '../../controllers/v1/files';

const router: Router = Router({ caseSensitive: true });

router.get('/', downloadFile);

export { router };
