import { Model, Schema, model, Types } from 'mongoose';
import { unqiueNumber } from './Static';
import { ILogger } from '../Interface/ILogger';

const LogSchema: Schema = new Schema<ILogger>({
  uid: { type: 'String' },
  message: { type: 'String', required: true },
  date_time: { type: Date, required: true, default: Date.now },
});

LogSchema.pre('save', function (this: ILogger, next) {
  this.uid = unqiueNumber().toString();
  next();
});

const LogModel: Model<ILogger> = model('Log', LogSchema);

export { LogModel };
