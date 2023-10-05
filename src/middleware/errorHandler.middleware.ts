import {NextFunction, Request, Response} from 'express';

import type {ErrorRequestHandler} from 'express';

import {Error} from '../models/errors.models';

const errorHandler: ErrorRequestHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
	if (err.status) {
		res.status(err.status).json({error: {status: err.status, message: err.message}});
	}

	res.status(500).json({error: {status: 500, message: 'There was an internal server error. Please try again.'}});
};

export default errorHandler;
