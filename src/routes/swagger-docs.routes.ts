import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import swaggerSpec from '../utils/swagger';

const swaggerApiDocs: Router = Router();

swaggerApiDocs.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default swaggerApiDocs;
