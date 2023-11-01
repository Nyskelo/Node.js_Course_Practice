import { ValidationResult } from 'joi';

export type JoiValidationFn<T> = (data: T) => ValidationResult<T>;
