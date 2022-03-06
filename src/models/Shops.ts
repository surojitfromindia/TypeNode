import { Model, Schema, model, Types } from 'mongoose';
import { unqiueNumber } from './Static';
import { IShop } from '../Interface/IShop';

const ShopSchema: Schema = new Schema<IShop>(
  {
    uid: { type: 'String' },
    name: { type: 'String', required: true },
    address: { type: 'String', required: false },
    staff_count: { type: 'Number', required: true },
    main_branch: { type: Types.ObjectId, ref: 'Shop', required: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ShopSchema.pre('save', function (this: IShop, next) {
  this.uid = unqiueNumber().toString();
  next();
});

//create a mongoose virtual field
ShopSchema.virtual('sub_shops_information', {
  ref: 'Shop',
  localField: '_id',
  foreignField: 'main_branch',
});

const ShopModel: Model<IShop> = model('Shop', ShopSchema);

export { ShopModel };
