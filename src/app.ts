import express from 'express';
import {Express} from 'express';

import errorHandler from './middleware/errorHandler';
import rootRouter from './routes';

const app: Express = express();

app.use(express.json());

app.use(rootRouter);

app.use(errorHandler);

export default app;