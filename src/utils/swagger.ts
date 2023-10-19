import swaggerJsdoc from 'swagger-jsdoc';

import { moviesSchema, moviesBodySchema, moviesSwaggerDocsPathSchema } from '../schemas/movies.schemas';
import { genreSchema, genreBodySchema, genreSwaggerDocsPathSchema } from '../schemas/genres.schemas';

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST-API NodeJS Course Practice',
      version: '1.0.0',
      description: 'Documentation for API',
    },
    components: {
      schemas: {
        HealthCheck: {
          type: 'object',
          properties: {
            uptime: {
              type: 'number',
              description: 'How long our server has been up and running since it started',
            },
            message: {
              type: 'string',
              description: 'The health status of the server',
            },
            timestamp: {
              type: 'number',
              description: 'The timestamp',
            },
          },
          example: {
            uptime: 7.3843028,
            message: 'OK',
            timestamp: 1696255732383,
          },
        },
        Movies: {
          ...moviesSchema,
          example: {
            _id: '6530713c9d403ed66accbd42',
            title: 'The Lion King 3',
            description: 'Incredible movie description 1',
            releaseDate: '2010-07-16',
            genre: ['drama', 'comedy', 'horror'],
          },
        },
        MovieBody: {
          ...moviesBodySchema,
          example: {
            title: 'The Lion King',
            description: 'Incredible movie description',
            releaseDate: '2010-07-16',
            genre: ['drama', 'comedy', 'horror'],
          },
        },
        Genres: {
          ...genreSchema,
          example: {
            _id: '6530713c9d403ed66accbd42',
            name: 'horror',
          },
        },
        GenreBody: {
          ...genreBodySchema,
          example: {
            name: 'horror',
          },
        },
      },
      paths: {
        ...moviesSwaggerDocsPathSchema,
        ...genreSwaggerDocsPathSchema,
      },
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                example: { status: 200, message: 'Success' },
              },
            },
          },
        },
        404: {
          description: 'Not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'object',
                    description: 'The error message',
                    example: { status: 404, message: 'Not found' },
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Invalid input',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'object',
                    description: 'The error message',
                    example: { status: 400, message: 'Invalid input data' },
                  },
                },
              },
            },
          },
        },
        500: {
          description: 'Internal Server Error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'object',
                    description: 'The error message',
                    example: { status: 500, message: 'Internal Server Error' },
                  },
                },
              },
            },
          },
        },
        503: {
          description: 'Service Unavailable',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: {
                    type: 'object',
                    description: 'The error message',
                    example: { status: 503, message: 'Service Unavailable' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/app.ts', './src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
