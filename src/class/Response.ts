import { IResponseBody } from 'src/Interface/IResponseBody';

class ErrorResponse extends Error {
  constructor(public statusCode: number, public message: string, public messages?: string[]) {
    super(message);
    this.statusCode = statusCode;
    this.messages = messages;
  }
}

const successResponse = (body: any, message?: string, exclude?: string[]): IResponseBody => {
  if (exclude) {
    for (const key of exclude) {
      delete body[key];
    }
  }
  return {  data: body, message };
};

export { ErrorResponse, successResponse };
