import { asyncWrapper } from '../../middlewares/asyncWrapper';
import {  Request, Response } from 'express';
import { ErrorResponse } from '../../middlewares/errorHandler';
import { IUser } from '../../Interface/IUser';
import jwt from 'jsonwebtoken';
import { User } from '../../models/User';


//register a user by a unqiuw email
const registerUser = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    let token = await signToken(user);

    res.status(200).json({ token: token });
  } catch (err) {
    throw new ErrorResponse(404, ['User can not be register']);
  }
});

const me = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const user_id = req?.userinfo?._id;
    const user = await User.findById(user_id);
    res.status(200).json(user);
  } catch (err) {
    throw new ErrorResponse(404, ['User can not be register']);
  }
});

const signToken = async (user: IUser) => {
  return jwt.sign(
    {
      iss: 'Surojit',
      sub: user._id,
      iat: new Date().getTime(),
    },
    'surojit'
  );
};
export { registerUser, me };
