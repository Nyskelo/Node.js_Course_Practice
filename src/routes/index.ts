import {Router} from 'express';

import notFoundError from '../middleware/notFoundError';

import swaggerApiDocs from './swagger-docs';
import healthCheck from './health-check';

const rootRouter = Router();

rootRouter.use(swaggerApiDocs);

rootRouter.use('/health-check', healthCheck);

rootRouter.use(notFoundError);

export default rootRouter;
