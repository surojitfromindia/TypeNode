import {Types } from 'mongoose';
import {IModel} from "./IModel"

interface IStaff extends IModel {
  uid?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  address?: string;
  shop_uid?: Types.ObjectId;
  temporalPassword?: string;
}

export { IStaff };