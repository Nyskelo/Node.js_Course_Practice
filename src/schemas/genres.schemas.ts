import Joi from 'joi';
import j2s, { SwaggerSchema } from 'joi-to-swagger';
import mongoose from 'mongoose';

const genreJoiSchema = Joi.object().keys({
  _id: Joi.string().description('Server-generated ID for the genre'),
  name: Joi.string().required(),
});

const genreBodyJoiSchema = Joi.object().keys({
  name: Joi.string().required(),
});

const genreMongooseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { versionKey: false },
);

const genreSchema: SwaggerSchema = j2s(genreJoiSchema).swagger;
const genreBodySchema: SwaggerSchema = j2s(genreBodyJoiSchema).swagger;

const genreSwaggerDocsPathSchema: SwaggerSchema = {
  '/movies/genres': {
    get: {
      summary: 'Get a list of genres',
      tags: ['Genres'],
      parameters: [],
      responses: {
        200: {
          description: 'Returns a list of genres',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Genres',
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
      summary: 'Add a new genre',
      tags: ['Genres'],
      requestBody: {
        description: 'Genre details',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GenreBody',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Returns the created genre',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Genres',
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
  '/movies/genres/{id}': {
    get: {
      summary: 'Get a genre by id',
      tags: ['Genres'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          description: 'Id of the genre',
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Returns a genre by id',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Genres',
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
      summary: 'Delete a genre by id',
      tags: ['Genres'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          description: 'Id of the genre',
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        200: {
          description: 'Returns the deleted genre',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                example: {
                  response: {
                    status: 200,
                    message: 'The genre has been deleted',
                    movie: {
                      _id: '6530713c9d403ed66accbd42',
                      name: 'horror',
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
      summary: 'Update a genre by id',
      tags: ['Genres'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          description: 'Id of the genre',
          schema: {
            type: 'string',
          },
        },
      ],
      requestBody: {
        description: 'Updated genre',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GenreBody',
            },
          },
        },
      },
      responses: {
        201: {
          description: 'Returns the updated genre',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Genres',
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
  genreSchema,
  genreBodySchema,
  genreJoiSchema,
  genreBodyJoiSchema,
  genreSwaggerDocsPathSchema,
  genreMongooseSchema,
};
