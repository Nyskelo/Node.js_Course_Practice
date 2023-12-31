import { Response, Request, NextFunction } from 'express';
import { MongooseError } from 'mongoose';

import GenreService from '../services/genres.services';

import { Genre } from '../models/genres.models';

const genreService = new GenreService();

export default class GenreController {
  async CreateGenre(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name } = req.body;
      const genreByName = await genreService.FindGenreByName(name);

      if (genreByName.length) {
        res.status(409).json({ error: { status: 409, message: `The genre '${name}' is already exist.` } });
      } else {
        const genre = await genreService.CreateGenre(req.body);

        res.status(201).json(genre);
      }
    } catch (error) {
      next(error);
    }
  }

  async GetAllGenres(_req: Request, res: Response, next: NextFunction): Promise<Response<Genre[]> | undefined> {
    try {
      const genres = await genreService.GetAllGenres();
      if (!genres.length) {
        const response = { status: 204, message: 'No genres found, feel free to add a genre :)' };
        return res.status(204).send({ response });
      }

      res.status(200).json(genres);
    } catch (error) {
      next(error);
    }
  }

  async GetGenreById(req: Request, res: Response, next: NextFunction): Promise<Response<Genre> | undefined> {
    try {
      const { id } = req.params;
      const genre = await genreService.GetGenreById(id);

      res.status(200).json(genre);
    } catch (error) {
      if (error instanceof MongooseError) {
        return res.status(404).json({ error: { status: 404, message: 'Genre not found' } });
      }
      next(error);
    }
  }

  async DeleteGenreById(req: Request, res: Response, next: NextFunction): Promise<Response<Genre> | undefined> {
    try {
      const { id } = req.params;
      const genre = await genreService.DeleteGenreById(id);

      if (!genre) {
        return res.status(404).json({ error: { status: 404, message: 'Genre not found' } });
      }

      res.status(200).json({ response: { status: 200, message: 'The Genre has been deleted', genre } });
    } catch (error) {
      if (error instanceof MongooseError) {
        return res.status(404).json({ error: { status: 404, message: 'Genre not found' } });
      }
      next(error);
    }
  }

  async UpdateGenreById(req: Request, res: Response, next: NextFunction): Promise<Response<Genre> | undefined> {
    try {
      const { name } = req.body;
      const genreByName = await genreService.FindGenreByName(name);

      if (genreByName.length) {
        return res
          .status(409)
          .json({ error: { status: 409, message: `The genre with name '${name}' is already exist.` } });
      } else {
        const { id } = req.params;
        const genre = await genreService.UpdateGenreById(id, req.body);

        return res.status(200).json(genre);
      }
    } catch (error) {
      next(error);
    }
  }
}
