import { Types } from 'mongoose';
import { IModel } from './IModel';

interface IProduct extends IModel {
  main_brach?: Types.ObjectId;
  uid?: string;
  name: string;
  description?: string;
  prices: [IProductPrice];
  category?: Types.ObjectId;
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
  main_brach?: Types.ObjectId;
}
export { IProduct, IProductCategory };
