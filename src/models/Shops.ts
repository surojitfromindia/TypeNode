import { Model, Schema, model, Types } from 'mongoose';
import { unqiueNumber } from './Static';
import { IShop } from '../Interface/IShop';

const ShopSchema: Schema = new Schema<IShop>({
  uid: { type: 'String' },
  name: { type: 'String', required: true },
  address: { type: 'String', required: false },
  staff_count: { type: 'Number', required: true },
  main_brach: { type: Types.ObjectId, required: false },
});

ShopSchema.pre('save', function (this: IShop, next) {
  this.uid = unqiueNumber().toString();
  next();
});

const ShopModel: Model<IShop> = model('Shop', ShopSchema);

export { ShopModel };
