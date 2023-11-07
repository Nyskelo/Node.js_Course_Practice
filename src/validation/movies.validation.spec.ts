import { validateMovieBody } from './movies.validation';
import { moviesJoiBodySchema } from '../schemas/movies.schemas';
import { DbMock } from './../__mock__/mock-data';

describe('validatemovies', () => {
  it('should call Joi validation', () => {
    const { title, description, genre, releaseDate } = DbMock.movieData[0];
    jest.spyOn(moviesJoiBodySchema, 'validate');

    validateMovieBody({ title, description, genre, releaseDate });

    expect(moviesJoiBodySchema.validate).toHaveBeenCalledTimes(1);
    expect(moviesJoiBodySchema.validate).toHaveBeenCalledWith({ title, description, genre, releaseDate });
  });
});
