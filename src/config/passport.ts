import passport from 'passport';
import passportJWT from 'passport-jwt';
import { User } from '../models/User';
const jwtStragey = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use('auth',
  new jwtStragey(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'surojit',
      passReqToCallback: true,
    },
    async function (req: any, jwtPayload: any, done: any) {
      let user_id = jwtPayload.sub;
      try {
        let user = await User.findById(user_id);
        req.userinfo = user;
        if (user !== null) {
          done(false, user);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);
