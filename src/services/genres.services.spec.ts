import { Genre, GenreDb } from '../models/genres.models';
import { DbMock } from '../__mock__/mock-data';
import GenreService from './genres.services';

describe('Genres endpoints', () => {
  let genreService: GenreService;
  const genreBodyMock = { name: 'genre name' };

  beforeEach(() => {
    genreService = new GenreService();
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  describe('CreateGenre', () => {
    it('should call save method', async () => {
      const saveSpy = jest.spyOn(GenreDb.prototype, 'save');

      await genreService.CreateGenre(genreBodyMock);

      expect(saveSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('GetAllGenres', () => {
    it('should call find method', async () => {
      const findSpy = jest.spyOn(GenreDb, 'find');

      await genreService.GetAllGenres();

      expect(findSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('GetGenreById', () => {
    it('should call findById method', async () => {
      const findByIdSpy = jest.spyOn(GenreDb, 'findById');

      await genreService.GetGenreById(DbMock.genreData[0]._id);

      expect(findByIdSpy).toHaveBeenCalledTimes(1);
      expect(findByIdSpy).toHaveBeenCalledWith(DbMock.genreData[0]._id);
    });
  });

  describe('FindGenreByName', () => {
    it('should call find method', async () => {
      const findSpy = jest.spyOn(GenreDb, 'find');

      await genreService.FindGenreByName(genreBodyMock.name);

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith(genreBodyMock);
    });
  });

  describe('DeleteGenreById', () => {
    it('should call findByIdAndDelete method', async () => {
      const findByIdAndDeleteSpy = jest.spyOn(GenreDb, 'findByIdAndDelete');

      await genreService.DeleteGenreById(DbMock.genreData[0]._id);

      expect(findByIdAndDeleteSpy).toHaveBeenCalledTimes(1);
      expect(findByIdAndDeleteSpy).toHaveBeenCalledWith(DbMock.genreData[0]._id);
    });
  });

  describe('UpdateGenreById', () => {
    it('should call findByIdAndUpdate method', async () => {
      const genreToUpdate = DbMock.genreData[0] as unknown as Genre;
      const findByIdAndUpdateSpy = jest.spyOn(GenreDb, 'findByIdAndUpdate');

      await genreService.UpdateGenreById(`${genreToUpdate._id}`, genreToUpdate);

      expect(findByIdAndUpdateSpy).toHaveBeenCalledTimes(1);
      expect(findByIdAndUpdateSpy).toHaveBeenCalledWith(`${genreToUpdate._id}`, genreToUpdate, { new: true });
    });
  });
});
