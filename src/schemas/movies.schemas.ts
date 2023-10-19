import Joi from 'joi';
import j2s, { SwaggerSchema } from 'joi-to-swagger';
import mongoose from 'mongoose';

const moviesJoiSchema = Joi.object().keys({
  _id: Joi.string().description('Server-generated ID for the movie'),
  title: Joi.string().required(),
  description: Joi.string().required(),
  releaseDate: Joi.string().required(),
  genre: Joi.array().items(Joi.string()).required(),
});

const moviesJoiBodySchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  releaseDate: Joi.string().required(),
  genre: Joi.array().items(Joi.string()).required(),
});

const movieMongooseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
});

const moviesSchema: SwaggerSchema = j2s(moviesJoiSchema).swagger;
const moviesBodySchema: SwaggerSchema = j2s(moviesJoiBodySchema).swagger;

const moviesSwaggerDocsPathSchema: SwaggerSchema = {
  '/movies': {
    get: {
      summary: 'Get a list of movies',
      tags: ['Movies'],
      parameters: [],
      responses: {
        200: {
          description: 'Returns a list of movies',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Movies',
                },
              },
            },
          },
        },
        404: {
          $ref: '#/components/responses/404',
        },
        500: {
          $ref: '#/components/responses/500',
        },
        503: {
          $ref: '#/components/responses/503',
        },
      },
    },
    post: {
      summary: 'Add a new movie',
      tags: ['Movies'],
      requestBody: {
        description: 'Movie details',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/MovieBody',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Returns the created movie',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Movies',
              },
            },
          },
        },
        400: {
          $ref: '#/components/responses/400',
        },
        404: {
          $ref: '#/components/responses/404',
        },
        500: {
          $ref: '#/components/responses/500',
        },
        503: {
          $ref: '#/components/responses/503',
        },
      },
    },
  },
  '/movies/{id}': {
    get: {
      summary: 'Get a movie by id',
      tags: ['Movies'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          description: 'Id of the movie',
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Returns a movie by id',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Movies',
              },
            },
          },
        },
        400: {
          $ref: '#/components/responses/400',
        },
        404: {
          $ref: '#/components/responses/404',
        },
        500: {
          $ref: '#/components/responses/500',
        },
        503: {
          $ref: '#/components/responses/503',
        },
      },
    },
    delete: {
      summary: 'Delete a movie by id',
      tags: ['Movies'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          description: 'Id of the movie',
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Returns the deleted movie',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                example: {
                  respons: {
                    status: 200,
                    message: 'The movie has been deleted',
                    movie: {
                      _id: '6530713c9d403ed66accbd42',
                      title: 'The Lion King 3',
                      description: 'Incredible movie description 1',
                      releaseDate: '999999',
                      genre: ['drama', 'comedy', 'horror'],
                      __v: 0,
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          $ref: '#/components/responses/400',
        },
        404: {
          $ref: '#/components/responses/404',
        },
        500: {
          $ref: '#/components/responses/500',
        },
        503: {
          $ref: '#/components/responses/503',
        },
      },
    },
    put: {
      summary: 'Update a movie by id',
      tags: ['Movies'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          description: 'Id of the movie',
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'Updated movie',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/MovieBody',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Returns the updated movie',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Movies',
              },
            },
          },
        },
        400: {
          $ref: '#/components/responses/400',
        },
        404: {
          $ref: '#/components/responses/404',
        },
        500: {
          $ref: '#/components/responses/500',
        },
        503: {
          $ref: '#/components/responses/503',
        },
      },
    },
  },
  '/movies/genre/{genreName}': {
    get: {
      summary: 'Get a movie by genre',
      tags: ['Movies'],
      parameters: [
        {
          in: 'path',
          name: 'genreName',
          required: true,
          description: 'Genre name of the movie',
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Returns all of the movies that contain this genre.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Movies',
              },
            },
          },
        },
        404: {
          $ref: '#/components/responses/404',
        },
        500: {
          $ref: '#/components/responses/500',
        },
        503: {
          $ref: '#/components/responses/503',
        },
      },
    },
  },
};

export {
  moviesSchema,
  moviesBodySchema,
  moviesJoiSchema,
  moviesJoiBodySchema,
  moviesSwaggerDocsPathSchema,
  movieMongooseSchema,
};
