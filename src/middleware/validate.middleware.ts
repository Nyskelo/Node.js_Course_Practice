import { Response, Request, NextFunction } from 'express';

import { JoiValidationFn } from '../models/joi-validate.models';

export const validateMiddleware = <T>(validator: JoiValidationFn<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = validator(req.body);
    if (error) {
      const errorResponse = { status: 400, message: error.details[0].message.replace(/"/g, "'") };
      return res.status(400).send({ error: errorResponse });
    }
    next();
  };
};
