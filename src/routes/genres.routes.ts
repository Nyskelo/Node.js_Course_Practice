import { Router } from 'express';

import GenreController from '../conrollers/genres.controllers';

import { validateMiddleware } from '../middleware/validate.middleware';
import { validateGenre } from '../validation/genres.validation';

const genresRouter: Router = Router();
const genreController = new GenreController();

/**
 * @swagger
 * tags:
 *   - name: Genres
 *     description: Genres endpoints
 */

/**
 * @swagger
 * /movies/genres:
 *      $ref: '#/components/paths/~1movies~1genres'
 */
genresRouter.get('/', genreController.GetAllGenres);

/**
 * @swagger
 * /movies/genres/{id}:
 *      $ref: '#/components/paths/~1movies~1genres~1{id}'
 */
genresRouter.get('/:id', genreController.GetGenreById);

/**
 * @swagger
 * /movies/genres:
 *  $ref: '#/components/paths/~1movies~1genres'
 */
genresRouter.post('/', [validateMiddleware(validateGenre)], genreController.CreateGenre);

/**
 * @swagger
 * /movies/genres/{id}:
 *  $ref: '#/components/paths/~1movies~1genres~1{id}'
 */
genresRouter.delete('/:id', genreController.DeleteGenreById);

/**
 * @swagger
 * /movies/genres/{id}:
 *  $ref: '#/components/paths/~1movies~1genres~1{id}'
 */
genresRouter.put('/:id', [validateMiddleware(validateGenre)], genreController.UpdateGenreById);

export default genresRouter;
