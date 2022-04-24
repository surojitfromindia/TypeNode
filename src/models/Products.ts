import { Model, Schema, model, Types, IndexDefinition } from 'mongoose';
import { unqiueNumber } from './Static';
import { IProduct } from '../Interface/IProducts';

//extends the base model interface to supply new methods
//on Schema
interface IProductModel extends Model<IProduct> {
  updateField<O extends IProductUpdate, K extends keyof O, V extends O[K]>(
    product_uid: string | string[],
    name: K,
    new_value: V
  ): Promise<IProduct | object>;
}

//omit few fields from the interface
//to allow update for selected fields
type NonUpdateableFields = 'uid' | 'created_at' | 'updated_at' | '_id' | 'main_branch' | '__v';
type UpdateableFields = Exclude<keyof IProduct, NonUpdateableFields>;
type IProductUpdate = Pick<IProduct, UpdateableFields>;

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
        price: { type: 'Number', required: true, set: (v: number) => v.toFixed(2) },
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

ProductSchema.static('updateField', updateFieldStatic);

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

function updateFieldStatic<O extends IProductUpdate, K extends keyof O, V extends O[K]>(
  product_uid: string | string[],
  name: K,
  new_value: V
) {
  if (typeof product_uid === 'string') {
    const product = Product.findOneAndUpdate(
      { uid: product_uid },
      { $set: { [name]: new_value } },
      { new: true }
    ).lean();
    return product;
  }
  return Product.updateMany({ uid: { $in: product_uid } }, { $set: { [name]: new_value } }).lean();
}

export { Product, UpdateableFields };
