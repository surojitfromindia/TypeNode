import { Types } from 'mongoose';
import {IModel} from "./IModel"

interface IShop extends IModel {
  uid?: string;
  name: string;
  address?: string;
  staff_count: number;
  main_brach?: Types.ObjectId;
  sub_shops?: [IShop];
  sub_shops_id?: [Types.ObjectId];
}

export { IShop };
