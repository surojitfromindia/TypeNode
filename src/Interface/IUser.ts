import { Types } from 'mongoose';
import { IModel } from './IModel';

interface IUser extends IModel {
  _id?: string;
  email: string;
  password: string;
}

export { IUser };
