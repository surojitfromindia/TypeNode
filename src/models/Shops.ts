import { Model, Schema, model, Types } from 'mongoose';
import { unqiueNumber } from './Static';

interface Shop {
  uid?: string;
  name: string;
  address?: string;
  staff_count: number;
  main_brach?: Types.ObjectId;
  sub_shops?: [Shop] ;
  sub_shops_id ?: [Types.ObjectId];
}

const ShopSchema: Schema = new Schema<Shop>({
  uid: { type: 'String' },
  name: { type: 'String', required: true },
  address: { type: 'String', required: false },
  staff_count: { type: 'Number', required: true },
  main_brach: { type: Types.ObjectId, required: false },
});

ShopSchema.pre('save', function (this: Shop, next) {
  this.uid = unqiueNumber().toString();
  next();
});

const ShopModel: Model<Shop> = model('Shop', ShopSchema);

export { ShopModel, Shop };
