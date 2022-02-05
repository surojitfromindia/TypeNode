import Joi, { ObjectSchema, ValidationError } from 'joi';
import { ErrorResponse } from '../middlewares/errorHandler';
import { errorArray } from '../validation/utils';
import { Response, Request, NextFunction } from 'express';

const validatePayload =
  (schema: ObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const payload = req?.body;
      await schema.validateAsync(payload);
      next();
    } catch (err: any) {
      if (err instanceof ValidationError) {
        next(new ErrorResponse(400, errorArray(err)));
      }
    }
  };
export { validatePayload };
