import { validateGenre } from './genres.validation';
import { genreBodyJoiSchema } from '../schemas/genres.schemas';

describe('validateGenre', () => {
  it('should call Joi validation', () => {
    const genre = { name: 'genreName' };
    jest.spyOn(genreBodyJoiSchema, 'validate');

    validateGenre(genre);

    expect(genreBodyJoiSchema.validate).toHaveBeenCalledTimes(1);
    expect(genreBodyJoiSchema.validate).toHaveBeenCalledWith(genre);
  });
});
