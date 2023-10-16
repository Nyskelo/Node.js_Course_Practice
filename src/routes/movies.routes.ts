import { Router, Response, Request, NextFunction } from 'express';

import * as moviesService from '../services/movies.services';
import { moviesJoiSchema, moviesJoiBodySchema } from '../schemas/movies.schemas';

const moviesRouter: Router = Router();

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
moviesRouter.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const movies = await moviesService.getAllMovies();
    res.json(movies);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /movies/{id}:
 *      $ref: '#/components/paths/~1movies~1{id}'
 */
moviesRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const movie = await moviesService.getMovieById(id);

    if (!movie) {
      return res.status(404).json({ status: 404, message: 'Movie not found' });
    }

    res.json(movie);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /movies:
 *  $ref: '#/components/paths/~1movies'
 */
moviesRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await moviesJoiBodySchema.validateAsync(req.body);
    const movie = await moviesService.addMovie(req.body);
    res.status(201).json(movie);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /movies/{id}:
 *  $ref: '#/components/paths/~1movies~1{id}'
 */
moviesRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const movie = await moviesService.getMovieById(id);

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    await moviesService.removeMovieById(id);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /movies/{id}:
 *  $ref: '#/components/paths/~1movies~1{id}'
 */
moviesRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await moviesJoiSchema.validateAsync(req.body);

    const movie = await moviesService.updateMovieById(req.body);

    res.json(movie);
  } catch (error) {
    next(error);
  }
});

export default moviesRouter;
