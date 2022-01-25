import { ObjectSchema } from 'joi';
import { ErrorResponse } from '../middlewares/errorHandler';
import { errorArray } from '../validation/utils';

const validatePayload =
  (schema: ObjectSchema) =>
  async (req, _res, next): Promise<void> => {
    try {
      const payload = req?.body;
      await schema.validateAsync(payload);
      next();
    } catch (err) {
      next(new ErrorResponse(400, undefined, errorArray(err)));
    }
  };
export {validatePayload };
