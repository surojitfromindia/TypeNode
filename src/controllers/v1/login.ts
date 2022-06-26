import { asyncWrapper } from '../../middlewares/asyncWrapper';
import e, { Request, Response } from 'express';
import { ErrorResponse } from '../../middlewares/errorHandler';
import { IUser } from '../../Interface/IUser';
import jwt from 'jsonwebtoken';
import { User } from '../../models/User';
import * as bcrypt from 'bcrypt';

//register a user by a unqiuw email
const registerUser = asyncWrapper(async (req: Request, res: Response) => {
  try {
    let email = req.body.email;
    //check if the email is already exist in database
    const user_exist = await User.findOne({
      email: email,
    });
    if (user_exist !== null) {
      throw new ErrorResponse(404, ['email already exists']);
    }
    const plain_password = req.body.password;
    const password_hashed = await bcrypt.hash(plain_password, 10);

    const user = await User.create({
      email: req.body.email,
      password: password_hashed,
    });
    let token = await signToken(user);

    res.status(200).json({ token: token });
  } catch (err: any) {
    if (err instanceof ErrorResponse) {
      throw err;
    }
    throw new ErrorResponse(404, ['User can not be register']);
  }
});

const me = asyncWrapper(async (req: Request, res: Response) => {
  try {
    const user_id = req?.userinfo?._id;
    const user = await User.findById(user_id, { email: 1 });
    res.status(200).json(user);
  } catch (err) {
    throw new ErrorResponse(404, ['User can not be register']);
  }
});

const login = asyncWrapper(async (req: Request, res: Response) => {
  try {
    let email = req.body.email;
    let plain_password = req.body.password;
    const user = await User.findOne(
      {
        email: email,
      },
      { password: 1 },
      { lean: true }
    );
    if (user !== null) {
      const hashed_password = user.password;
      const password_match = await bcrypt.compare(plain_password, hashed_password);
      if (password_match) {
        let token = await signToken(user);
        res.status(200).json({ token: token });
      } else {
        throw new ErrorResponse(401, ['Passowrd or email does not match']);
      }
    } else {
      throw new ErrorResponse(400, ['User does not exist']);
    }
  } catch (err: any) {
    if (err instanceof ErrorResponse) {
      throw err;
    }
    throw new ErrorResponse(400, ['some unknow error']);
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
export { registerUser, me, login };
