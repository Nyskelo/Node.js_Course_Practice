import { Router, Response, Request } from 'express';

import { HealthCheck } from 'src/models/health-check.models';

const healthCkeck: Router = Router();

/**
 * @swagger
 * tags:
 *   - name: HealthCheck
 *     description: API health check endpoints
 */

/**
 * @swagger
 * /health-check:
 *  get:
 *     summary: Health check
 *     tags: [HealthCheck]
 *     description: Health status
 *     responses:
 *       200:
 *         $ref: '#/components/responses/200'
 *       404:
 *          $ref: '#/components/responses/404'
 *       500:
 *          $ref: '#/components/responses/500'
 *       503:
 *          $ref: '#/components/responses/503'
 */

healthCkeck.get('/', (_req: Request, res: Response) => {
  console.log('Health Check Request');

  const healthCheck: HealthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };

  res.status(200).json(healthCheck);
});

export default healthCkeck;
