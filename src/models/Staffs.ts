import { Model, Schema, model, Types } from 'mongoose';
import { unqiueNumber, randomwPassword } from './Static';

interface Staff {
  uid?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  address?: string;
  shop_uid?: Types.ObjectId;
  temporalPassword?: string;
}

const StaffSchema: Schema = new Schema<Staff>({
  uid: { type: 'String' },
  first_name: { type: 'String', required: true },
  last_name: { type: 'String', required: true },
  middle_name: { type: 'String', required: false },
  email: { type: 'String', required: true },
  address: { type: 'String', required: false },
  shop_uid: { type: Types.ObjectId, ref: 'Shop', required: false },
  temporalPassword: { type: 'String', required: false },
});

StaffSchema.pre('save', function (this: Staff, next) {
  this.uid = unqiueNumber().toString();
  if (this?.temporalPassword?.length == 10) {
    this.uid = randomwPassword();
  } else {
    this.temporalPassword = randomwPassword();
  }
  next();
});

const StaffModel: Model<Staff> = model('Staff', StaffSchema);

export { StaffModel };
