//api route for shop infomation
import { Router } from 'express';
import passport from 'passport';
import { registerUser, me as userinfo, login as userLogin } from '../../controllers/v1/login';
import '../../config/passport';
import { validatePayload } from '../../middlewares/validationPayload';
import { userSchema } from '../../validation/index';

const router: Router = Router({ caseSensitive: true });

router.post('/register', validatePayload(userSchema), registerUser);
router.post('/login', validatePayload(userSchema), userLogin);
router.get('/me', passport.authenticate('auth', { session: false }), userinfo);

export { router };
