import { Router } from 'express';

import notFoundError from '../middleware/notFoundError.middleware';

import swaggerApiDocs from './swagger-docs.routes';
import healthCheck from './health-check.routes';
import moviesRouter from './movies.routes';
import genresRouter from './genres.routes';

const rootRouter: Router = Router();

rootRouter.use(swaggerApiDocs);

rootRouter.use('/health-check', healthCheck);
rootRouter.use('/movies/genres', genresRouter);
rootRouter.use('/movies', moviesRouter);

rootRouter.use(notFoundError);

export default rootRouter;
