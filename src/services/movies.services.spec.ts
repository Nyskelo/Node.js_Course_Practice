import { Movie, MovieDb } from '../models/movies.models';
import { DbMock } from './../__mock__/mock-data';
import MovieService from './movies.services';

describe('Movies endpoints', () => {
  let movieService: MovieService;
  const { title, description, genre, releaseDate } = DbMock.movieData[0];
  const movieBodyMock = {
    title,
    description,
    genre,
    releaseDate,
  };

  beforeEach(() => {
    movieService = new MovieService();
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe('CreateMovie', () => {
    it('should call save method', async () => {
      const saveSpy = jest.spyOn(MovieDb.prototype, 'save');

      await movieService.CreateMovie(movieBodyMock);

      expect(saveSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('GetAllMovies', () => {
    it('should call find method', async () => {
      const findSpy = jest.spyOn(MovieDb, 'find');

      await movieService.GetAllMovies();

      expect(findSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('GetMovieByGenreName', () => {
    const targetGenreName = 'genre name';

    it('should call find method', async () => {
      const findSpy = jest.spyOn(MovieDb, 'find');

      await movieService.GetMovieByGenreName(targetGenreName);

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({ genre: { $in: [targetGenreName] } });
    });
  });

  describe('GetMovieById', () => {
    it('should call findById method', async () => {
      const findByIdSpy = jest.spyOn(MovieDb, 'findById');

      await movieService.GetMovieById(DbMock.movieData[0]._id);

      expect(findByIdSpy).toHaveBeenCalledTimes(1);
      expect(findByIdSpy).toHaveBeenCalledWith(DbMock.movieData[0]._id);
    });
  });

  describe('DeleteMovieById', () => {
    it('should call findByIdAndDelete method', async () => {
      const findByIdAndDeleteSpy = jest.spyOn(MovieDb, 'findByIdAndDelete');

      await movieService.DeleteMovieById(DbMock.movieData[0]._id);

      expect(findByIdAndDeleteSpy).toHaveBeenCalledTimes(1);
      expect(findByIdAndDeleteSpy).toHaveBeenCalledWith(DbMock.movieData[0]._id);
    });
  });

  describe('UpdateMovieById', () => {
    it('should call findByIdAndUpdate method', async () => {
      const movieToUpdate = DbMock.movieData[0] as unknown as Movie;
      const findByIdAndUpdateSpy = jest.spyOn(MovieDb, 'findByIdAndUpdate');

      await movieService.UpdateMovieById(`${movieToUpdate._id}`, movieToUpdate);

      expect(findByIdAndUpdateSpy).toHaveBeenCalledTimes(1);
      expect(findByIdAndUpdateSpy).toHaveBeenCalledWith(`${movieToUpdate._id}`, movieToUpdate, { new: true });
    });
  });
});
