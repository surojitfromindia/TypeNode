import { ValidationError, ValidationErrorItem } from 'joi';
function errorArray(errorMessages: ValidationError): string[] {
  const errors: string[] = [];
  const errosDetails: ValidationErrorItem[] = errorMessages.details;
  errosDetails.forEach((err) => {
    errors.push(err.message);
  });
  return errors;
}
export { errorArray, };
