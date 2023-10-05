import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJsdoc.Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'REST-API NodeJS Course Practice',
			version: '1.0.0',
			description: 'Documentation for API'
		},
		components: {
			schemas: {
				HealthCheck: {
					type: 'object',
					properties: {
						uptime: {
							type: 'number',
							description: 'How long our server has been up and running since it started'
						},
						message: {
							type: 'string',
							description: 'The health status of the server'
						},
						timestamp: {
							type: 'number',
							description: 'The timestamp'
						}
					},
					example: {uptime: 7.3843028, message: 'OK', timestamp: 1696255732383}
				}
			},
			responses: {
				200: {
					description: 'Success',
					contents: 'application/json'
				},
				404: {
					description: 'Not found',
					contents: 'application/json'
				},
				500: {
					description: 'Internal Server Error',
					contents: 'application/json'
				},
				503: {
					description: 'Service Unavailable',
					contents: 'application/json'
				}
			}
		}
	},
	apis: ['./src/app.ts', './src/routes/*.ts']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
