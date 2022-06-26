import { ObjectSchema, ValidationError } from 'joi';
import { ErrorResponse } from '../middlewares/errorHandler';
import { errorArray } from '../validation/utils';
import { Response, Request, NextFunction } from 'express';
const DEFAULT_HTTP_ERROR_CODE = 400
const validatePayload =
  (schema: ObjectSchema, error_code : number = DEFAULT_HTTP_ERROR_CODE) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload = req?.body;
      await schema.validateAsync(payload,{errors: { label: 'key' }, abortEarly:false});
      next();
    } catch (err: any) {
      if (err instanceof ValidationError) {
        next(new ErrorResponse(error_code, errorArray(err)));
      }
    }
  };
export { validatePayload };
