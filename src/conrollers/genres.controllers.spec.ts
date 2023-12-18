import { NextFunction, Request, Response } from 'express';
import { MockProxy, mock } from 'jest-mock-extended';

import GenreController from './../conrollers/genres.controllers';
import { GenreDb } from '../models/genres.models';
import { DbMock, ErrorMock, responseMock } from './../__mock__/mock-data';

describe('GenreController', () => {
  let genreController: GenreController;
  let mockRequest: MockProxy<Request>;
  let mockResponse: MockProxy<Response>;
  const mockNext: NextFunction = jest.fn();

  beforeEach(() => {
    genreController = new GenreController();
    mockRequest = mock<Request>();
    mockResponse = mock<Response>();

    mockResponse.status.mockReturnThis();
    mockResponse.json.mockReturnThis();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GetAllGenres', () => {
    describe('success', () => {
      it('should return a successful response with a status code of 200 and body with all genres', async () => {
        GenreDb.find = jest.fn().mockResolvedValue(DbMock.genreData);

        await genreController.GetAllGenres(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith(DbMock.genreData);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });

      it('should return a successful response with a status code of 204 and message result', async () => {
        GenreDb.find = jest.fn().mockResolvedValue([]);

        await genreController.GetAllGenres(mockRequest, mockResponse, mockNext);

        expect(mockResponse.send).toHaveBeenCalledTimes(1);
        expect(mockResponse.send).toHaveBeenCalledWith(
          expect.objectContaining({
            response: responseMock,
          }),
        );

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(204);
      });
    });

    describe('error', () => {
      it('should call the next function with an error', async () => {
        GenreDb.find = jest.fn().mockRejectedValue(ErrorMock.error);

        await genreController.GetAllGenres(mockRequest, mockResponse, mockNext);

        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(ErrorMock.error);
      });
    });
  });

  describe('CreateGenre', () => {
    beforeEach(() => {
      mockRequest.body = { name: DbMock.genreData[0].name };
    });

    describe('success', () => {
      it('should return a successful response with a status code of 201 and body with a newly created genre', async () => {
        const newGenre = DbMock.genreData[0];
        GenreDb.find = jest.fn().mockResolvedValue([]);
        GenreDb.prototype.save = jest.fn().mockResolvedValue(newGenre);

        await genreController.CreateGenre(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith(newGenre);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
      });
    });

    describe('error', () => {
      it('should return a status code of 409, error message', async () => {
        GenreDb.find = jest.fn().mockResolvedValue([DbMock.genreData[0].name]);

        await genreController.CreateGenre(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith(
          expect.objectContaining({
            error: responseMock,
          }),
        );

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(409);

        expect(mockNext).not.toHaveBeenCalled();
      });

      it('should call the next function with an error', async () => {
        GenreDb.find = jest.fn().mockRejectedValue(ErrorMock.error);

        await genreController.CreateGenre(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).not.toHaveBeenCalled();
        expect(mockResponse.status).not.toHaveBeenCalled();

        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(ErrorMock.error);
      });
    });
  });

  describe('GetGenreById', () => {
    describe('success', () => {
      it('should return a successful response with a status code of 200 and body with a correct genre', async () => {
        const expectedGenre = DbMock.genreData[0];
        GenreDb.findById = jest.fn().mockResolvedValue(expectedGenre);

        await genreController.GetGenreById(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith(expectedGenre);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });

    describe('error', () => {
      it('should return a status code of 404 and an error message if the error type is MongooseError', async () => {
        GenreDb.findById = jest.fn().mockRejectedValue(ErrorMock.mongooseError);

        await genreController.GetGenreById(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith(
          expect.objectContaining({
            error: responseMock,
          }),
        );

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(404);

        expect(mockNext).not.toHaveBeenCalled();
      });

      it('should call the next function with an error', async () => {
        GenreDb.findById = jest.fn().mockRejectedValue(ErrorMock.error);

        await genreController.GetGenreById(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).not.toHaveBeenCalled();
        expect(mockResponse.status).not.toHaveBeenCalled();

        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(ErrorMock.error);
      });
    });
  });

  describe('DeleteGenreById', () => {
    describe('success', () => {
      it('should return a successful response with a status code of 200 and body with a deleted genre', async () => {
        const genreToDelete = DbMock.genreData[0];
        GenreDb.findByIdAndDelete = jest.fn().mockResolvedValue(genreToDelete);

        await genreController.DeleteGenreById(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith(
          expect.objectContaining({
            response: { ...responseMock, genre: genreToDelete },
          }),
        );

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });

    describe('error', () => {
      it('should return a status code of 404 and an error message if the genre by the same id is attempted to be deleted more than once', async () => {
        const genreToDelete = DbMock.genreData[0];
        GenreDb.findByIdAndDelete = jest.fn().mockResolvedValueOnce(genreToDelete).mockResolvedValueOnce(null);

        await genreController.DeleteGenreById(mockRequest, mockResponse, mockNext);
        await genreController.DeleteGenreById(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).toHaveBeenCalledTimes(2);
        expect(mockResponse.json).toHaveBeenLastCalledWith(
          expect.objectContaining({
            error: responseMock,
          }),
        );

        expect(mockResponse.status).toHaveBeenCalledTimes(2);
        expect(mockResponse.status).toHaveBeenLastCalledWith(404);

        expect(mockNext).not.toHaveBeenCalled();
      });

      it('should return a status code of 404 and an error message if the error type is MongooseError', async () => {
        GenreDb.findByIdAndDelete = jest.fn().mockRejectedValue(ErrorMock.mongooseError);

        await genreController.DeleteGenreById(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith(
          expect.objectContaining({
            error: responseMock,
          }),
        );

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(404);

        expect(mockNext).not.toHaveBeenCalled();
      });

      it('should call the next function with an error', async () => {
        GenreDb.findByIdAndDelete = jest.fn().mockRejectedValue(ErrorMock.error);

        await genreController.DeleteGenreById(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).not.toHaveBeenCalled();
        expect(mockResponse.status).not.toHaveBeenCalled();

        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(ErrorMock.error);
      });
    });
  });

  describe('UpdateGenreById', () => {
    describe('success', () => {
      it('should return a successful response with a status code of 200 and body with a deleted genre', async () => {
        const genreToUpdate = { ...DbMock.genreData[0], name: ['new genre name'] };
        GenreDb.find = jest.fn().mockResolvedValue([]);
        GenreDb.findByIdAndUpdate = jest.fn().mockResolvedValue(genreToUpdate);

        await genreController.UpdateGenreById(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith(genreToUpdate);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });

    describe('error', () => {
      it('should return a status code of 404 and an error message if the genre by the same name is already exist', async () => {
        const genreToUpdate = { ...DbMock.genreData[0], name: ['new genre name'] };
        GenreDb.find = jest.fn().mockResolvedValue(genreToUpdate.name);

        await genreController.UpdateGenreById(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenLastCalledWith(
          expect.objectContaining({
            error: responseMock,
          }),
        );

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenLastCalledWith(409);

        expect(mockNext).not.toHaveBeenCalled();
      });

      it('should call the next function with an error', async () => {
        GenreDb.find = jest.fn().mockRejectedValue(ErrorMock.error);

        await genreController.UpdateGenreById(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).not.toHaveBeenCalled();
        expect(mockResponse.status).not.toHaveBeenCalled();

        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(ErrorMock.error);
      });
    });
  });
});
