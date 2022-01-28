import { Model, Schema, model } from 'mongoose';
import { unqiueNumber } from './Static';

interface Shop {
  uid?: string;
  name: string;
  address?: string;
  staff_count: number;
}

const ShopSchema: Schema = new Schema<Shop>({
  uid: { type: 'String' },
  name: { type: 'String', required: true },
  address: { type: 'String', required: false },
  staff_count: { type: 'Number', required: true },
});


 
ShopSchema.pre('save', function (this: Shop, next) {
  this.uid = unqiueNumber().toString();
  next();
});

const ShopModel: Model<Shop> = model('Shop', ShopSchema);

export { ShopModel };
