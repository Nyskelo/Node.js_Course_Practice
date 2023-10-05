import {Request, Response} from 'express';

const notFoundError = (_req: Request, res: Response) =>
	res.status(404).json({error: {status: 404, message: 'Page Not Found'}});

export default notFoundError;
