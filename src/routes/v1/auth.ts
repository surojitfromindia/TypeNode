//api route for shop infomation
import { Router } from 'express';
import passport from 'passport';
import { registerUser, me as userinfo } from '../../controllers/v1/login';
import '../../config/passport';

const router: Router = Router({ caseSensitive: true });

router.post('/register', registerUser);
router.get('/me', passport.authenticate('auth', { session: false }), userinfo);

export { router };
