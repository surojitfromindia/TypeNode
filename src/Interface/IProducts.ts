import { Types } from 'mongoose';
import { IModel } from './IModel';

interface IProduct extends IModel {
  main_branch?: Types.ObjectId;
  uid?: string;
  name: string;
  description?: string;
  prices: IProductPrice[];
  category?: Types.ObjectId;
  inventories?: Types.ObjectId[];
}

interface IProductPrice {
  price: number;
  currency: string;
}

interface IProductCategory extends IModel {
  uid?: string;
  category_name: string;
  category_description: string;
  addable: boolean;
  main_branch?: Types.ObjectId;
}

interface IInventory extends IModel {
  uid?: string;
  inventory_name: string;
  inventory_description?: string;
  main_branch?: Types.ObjectId;
  capacity: number;
  status: string;
}

export { IProduct, IProductCategory, IInventory };
