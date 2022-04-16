import { Model, Schema, model, Types, IndexDefinition } from 'mongoose';
import { unqiueNumber } from './Static';
import { IProduct } from '../Interface/IProducts';

const ProductSchema: Schema = new Schema<IProduct>({
  uid: { type: 'String', index: true, unique: true, default: unqiueNumber },
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

// ProductSchema.pre('save', function (this: IProduct, next) {
//   this.uid = unqiueNumber().toString();
//   next();
// });

const ProductModel: Model<IProduct> = model('Product', ProductSchema);

export { ProductModel };
