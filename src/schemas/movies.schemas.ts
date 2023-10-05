import Joi from 'joi';
import j2s from 'joi-to-swagger';

const moviesJoiSchema = Joi.object().keys({
	id: Joi.string().required(),
	title: Joi.string().required(),
	description: Joi.string().required(),
	releaseDate: Joi.string().required(),
	genre: Joi.array().items(Joi.string()).required()
});

const moviesJoiBodySchema = Joi.object().keys({
	title: Joi.string().required(),
	description: Joi.string().required(),
	releaseDate: Joi.string().required(),
	genre: Joi.array().items(Joi.string()).required()
});

const moviesSchema = j2s(moviesJoiSchema).swagger;
const moviesBodySchema = j2s(moviesJoiBodySchema).swagger;

const moviesSwaggerDocsPath = {
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
									$ref: '#/components/schemas/Movies'
								}
							}
						}
					}
				},
				400: {
					$ref: '#/components/responses/400'
				},
				404: {
					$ref: '#/components/responses/404'
				},
				500: {
					$ref: '#/components/responses/500'
				},
				503: {
					$ref: '#/components/responses/503'
				}
			}
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
							$ref: '#/components/schemas/MovieBody'
						}
					}
				}
			},
			responses: {
				201: {
					description: 'Returns the created movie',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Movies'
							}
						}
					}
				},
				400: {
					$ref: '#/components/responses/400'
				},
				404: {
					$ref: '#/components/responses/404'
				},
				500: {
					$ref: '#/components/responses/500'
				},
				503: {
					$ref: '#/components/responses/503'
				}
			}
		}
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
						type: 'string'
					}
				}
			],
			responses: {
				200: {
					description: 'Returns a movie by id',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Movies'
							}
						}
					}
				},
				400: {
					$ref: '#/components/responses/400'
				},
				404: {
					$ref: '#/components/responses/404'
				},
				500: {
					$ref: '#/components/responses/500'
				},
				503: {
					$ref: '#/components/responses/503'
				}
			}
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
						type: 'string'
					}
				}
			],
			responses: {
				200: {
					description: 'Returns the created movie',
					content: {
						'application/json': {
							schema: {
								type: 'object',
								example: {status: 200, message: 'Movie deleted successfully'}
							}
						}
					}
				},
				400: {
					$ref: '#/components/responses/400'
				},
				404: {
					$ref: '#/components/responses/404'
				},
				500: {
					$ref: '#/components/responses/500'
				},
				503: {
					$ref: '#/components/responses/503'
				}
			}
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
						type: 'string'
					}
				}
			],
			requestBody: {
				description: 'Updated movie',
				required: true,
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/Movies'
						}
					}
				}
			},
			responses: {
				201: {
					description: 'Returns the updated movie',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Movies'
							}
						}
					}
				},
				400: {
					$ref: '#/components/responses/400'
				},
				404: {
					$ref: '#/components/responses/404'
				},
				500: {
					$ref: '#/components/responses/500'
				},
				503: {
					$ref: '#/components/responses/503'
				}
			}
		}
	}
};

export {moviesSchema, moviesBodySchema, moviesJoiSchema, moviesJoiBodySchema, moviesSwaggerDocsPath};
