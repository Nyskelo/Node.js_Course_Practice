import { Movie } from '../models/movies.models';

import { Response, Request, NextFunction } from 'express';
import { MongooseError } from 'mongoose';

import MovieService from '../services/movies.services';

const movieService = new MovieService();

export default class MovieController {
  async CreateMovie(req: Request, res: Response, next: NextFunction): Promise<Response<Movie> | undefined> {
    try {
      const movie = await movieService.CreateMovie(req.body);
      res.status(201).json(movie);
    } catch (error) {
      if (error instanceof MongooseError) {
        return res.status(400).json({ error: { status: 400, message: "'releaseDate' is not a valid Date." } });
      }
      next(error);
    }
  }

  async GetAllMovies(_req: Request, res: Response, next: NextFunction): Promise<Response<Movie[]> | undefined> {
    try {
      const movies = await movieService.GetAllMovies();
      if (!movies.length) {
        const response = { status: 204, message: 'No movies found, feel free to add a movie :)' };
        return res.status(204).send({ response });
      }

      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  async GetMovieByGenreName(req: Request, res: Response, next: NextFunction): Promise<Response<Movie[]> | undefined> {
    try {
      const { genreName } = req.params;
      const allMoviesByGenre = await movieService.GetMovieByGenreName(genreName);

      if (!allMoviesByGenre.length) {
        const response = {
          status: 204,
          message: 'There are no movies found by this genre, feel free to add a new movie :)',
        };

        return res.status(204).json({ response });
      }

      res.status(200).json(allMoviesByGenre);
    } catch (error) {
      next(error);
    }
  }

  async GetMovieById(req: Request, res: Response, next: NextFunction): Promise<Response<Movie> | undefined> {
    try {
      const { id } = req.params;
      const movie = await movieService.GetMovieById(id);

      res.status(200).json(movie);
    } catch (error) {
      if (error instanceof MongooseError) {
        return res.status(404).json({ error: { status: 404, message: 'Movie not found' } });
      }

      next(error);
    }
  }

  async DeleteMovieById(req: Request, res: Response, next: NextFunction): Promise<Response<Movie> | undefined> {
    try {
      const { id } = req.params;
      const movie = await movieService.DeleteMovieById(id);

      if (!movie) {
        return res.status(404).json({ error: { status: 404, message: 'Movie not found' } });
      }

      return res.status(200).json({ response: { status: 200, message: 'The movie has been deleted', movie } });
    } catch (error) {
      if (error instanceof MongooseError) {
        return res.status(404).json({ error: { status: 404, message: 'Movie not found' } });
      }
      next(error);
    }
  }

  async UpdateMovieById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const movie = await movieService.UpdateMovieById(id, req.body);

      res.status(200).json(movie);
    } catch (error) {
      next(error);
    }
  }
}
