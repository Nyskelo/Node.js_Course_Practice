import { GenreBody } from '../models/genres.models';
import { genreBodyJoiSchema } from '../schemas/genres.schemas';

export const validateGenre = (genre: GenreBody) => {
  return genreBodyJoiSchema.validate(genre);
};
