import { Types } from 'mongoose';
import { IModel } from './IModel';

interface IShop extends IModel {
  uid?: string;
  name: string;
  address?: string;
  staff_count: number;
  main_branch?: Types.ObjectId;

  sub_shops?: IShop[]; //for testing
  sub_shops_id?: Types.ObjectId[]; //for testing
}

export { IShop };
