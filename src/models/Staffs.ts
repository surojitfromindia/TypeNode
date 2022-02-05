import { Model, Schema, model, Types } from 'mongoose';
import { unqiueNumber, randomwPassword } from './Static';
import {IStaff} from "../Interface/IStaff"


const StaffSchema: Schema = new Schema<IStaff>({
  uid: { type: 'String' },
  first_name: { type: 'String', required: true },
  last_name: { type: 'String', required: true },
  middle_name: { type: 'String', required: false },
  email: { type: 'String', required: true },
  address: { type: 'String', required: false },
  shop_uid: { type: Types.ObjectId, ref: 'Shop', required: false },
  temporalPassword: { type: 'String', required: false },
});

StaffSchema.pre('save', function (this: IStaff, next) {
  this.uid = unqiueNumber().toString();
  if (this?.temporalPassword?.length == 10) {
    this.uid = randomwPassword();
  } else {
    this.temporalPassword = randomwPassword();
  }
  next();
});

const StaffModel: Model<IStaff> = model('Staff', StaffSchema);

export { StaffModel };
