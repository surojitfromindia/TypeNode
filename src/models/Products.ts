import { Model, Schema, model, Types, IndexDefinition } from 'mongoose';
import { unqiueNumber } from './Static';
import { IProduct } from '../Interface/IProducts';

interface IProductModel extends Model<IProduct> {
  updateName(product_uid: string | string[], new_name: string): Promise<IProduct | any>;
}

const ProductSchema: Schema<IProduct, IProductModel> = new Schema<IProduct, IProductModel>({
  uid: { type: 'String', index: true, unique: true },
  //   category: { type: Types.ObjectId, ref: 'Category', required: true },
  inventories: {
    type: [Types.ObjectId],
    ref: 'Inventory',
    required: false,
    default: [],
  },
  main_branch: { type: Types.ObjectId, required: true },
  name: { type: 'String', required: true },
  description: { type: 'String', required: false, default: '' },
  prices: {
    type: [
      {
        price: { type: 'Number', required: true, set: (v: Number) => v.toFixed(2) },
        currency: { type: 'String', required: true },
      },
    ],
    required: true,
  },
});

const index: IndexDefinition = {
  main_branch: 1,
  name: 1,
  inventories: 1,
};

ProductSchema.index(index);

ProductSchema.static('updateName', function (product_uid: string | string[], name: string) {
  const product_new_name = name;
  if (typeof product_uid === 'string') {
    const product = Product.findOneAndUpdate(
      { uid: product_uid },
      { $set: { name: product_new_name } },
      { new: true }
    ).lean();
    return product;
  }
  return Product.updateMany({ uid: { $in: product_uid } }, { $set: { name: product_new_name } }).lean();
});

ProductSchema.pre('save', function (this: IProduct, next) {
  this.uid = unqiueNumber().toString();
  next();
});

ProductSchema.pre('insertMany', function (this: IProduct[], next) {
  this.forEach((product: IProduct) => {
    product.uid = unqiueNumber().toString();
  });
  next();
});

const Product = model<IProduct, IProductModel>('Product', ProductSchema);

export { Product };
