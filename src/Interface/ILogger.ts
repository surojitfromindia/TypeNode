interface ILogger {
  uid?: string;
  message: string;
  date_time?: Date;
  action: LoggerAction;
}
enum LoggerAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}
export { ILogger,LoggerAction };
