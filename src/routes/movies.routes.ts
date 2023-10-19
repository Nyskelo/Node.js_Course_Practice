import { Router } from 'express';

import MovieController from '../conrollers/movies.controllers';

import { validateMiddleware } from '../middleware/validate.middleware';
import { validateMovieBody } from '../validation/movies.validation';

const moviesRouter: Router = Router();
const movieController = new MovieController();

/**
 * @swagger
 * tags:
 *   - name: Movies
 *     description: Movies endpoints
 */

/**
 * @swagger
 * /movies:
 *      $ref: '#/components/paths/~1movies'
 */
moviesRouter.get('/', movieController.GetAllMovies);

/**
 * @swagger
 * /movies/{id}:
 *      $ref: '#/components/paths/~1movies~1{id}'
 */
moviesRouter.get('/:id', movieController.GetMovieById);

/**
 * @swagger
 * /movies/genre/{genreName}:
 *      $ref: '#/components/paths/~1movies~1genre~1{genreName}'
 */
moviesRouter.get('/genre/:genreName', movieController.GetMovieByGenreName);

/**
 * @swagger
 * /movies:
 *  $ref: '#/components/paths/~1movies'
 */
moviesRouter.post('/', [validateMiddleware(validateMovieBody)], movieController.CreateMovie);

/**
 * @swagger
 * /movies/{id}:
 *  $ref: '#/components/paths/~1movies~1{id}'
 */
moviesRouter.delete('/:id', movieController.DeleteMovieById);

/**
 * @swagger
 * /movies/{id}:
 *  $ref: '#/components/paths/~1movies~1{id}'
 */
moviesRouter.put('/:id', [validateMiddleware(validateMovieBody)], movieController.UpdateMovieById);

export default moviesRouter;
