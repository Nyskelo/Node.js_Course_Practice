import { MovieBody } from '../models/movies.models';
import { moviesJoiBodySchema } from '../schemas/movies.schemas';

export const validateMovieBody = (movie: MovieBody) => {
  return moviesJoiBodySchema.validate(movie);
};
