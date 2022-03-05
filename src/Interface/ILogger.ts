import { Types } from 'mongoose';

interface ILogger {
  uid?: string;
  message: string;
  date_time?: Date;
  // user_id: Types.ObjectId;
  action: string;
}
export { ILogger };
