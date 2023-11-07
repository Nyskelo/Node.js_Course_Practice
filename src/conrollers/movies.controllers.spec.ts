import { NextFunction, Request, Response } from 'express';
import { MockProxy, mock } from 'jest-mock-extended';

import MovieController from './movies.controllers';
import { MovieDb } from '../models/movies.models';
import { DbMock, ErrorMock, responseMock } from '../__mock__/mock-data';

describe('MovieController', () => {
  let movieController: MovieController;
  let mockRequest: MockProxy<Request>;
  let mockResponse: MockProxy<Response>;
  const mockNext: NextFunction = jest.fn();

  beforeEach(() => {
    movieController = new MovieController();
    mockRequest = mock<Request>();
    mockResponse = mock<Response>();

    mockResponse.status.mockReturnThis();
    mockResponse.json.mockReturnThis();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GetAllMovies', () => {
    describe('success', () => {
      it('should return a successful response with a status code of 200 and body with all Movies', async () => {
        MovieDb.find = jest.fn().mockResolvedValue(DbMock.movieData);

        await movieController.GetAllMovies(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith(DbMock.movieData);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });

      it('should return a successful response with a status code of 204 and message result', async () => {
        MovieDb.find = jest.fn().mockResolvedValue([]);

        await movieController.GetAllMovies(mockRequest, mockResponse, mockNext);

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
        MovieDb.find = jest.fn().mockRejectedValue(ErrorMock.error);

        await movieController.GetAllMovies(mockRequest, mockResponse, mockNext);

        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(ErrorMock.error);
      });
    });
  });

  describe('CreateMovie', () => {
    const newMovie = DbMock.movieData[0];

    beforeEach(() => {
      mockRequest.body = DbMock.movieData[0];
    });

    describe('success', () => {
      it('should return a successful response with a status code of 201 and body with a newly created Movie', async () => {
        MovieDb.find = jest.fn().mockResolvedValue([]);
        MovieDb.prototype.save = jest.fn().mockResolvedValue(newMovie);

        await movieController.CreateMovie(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith(newMovie);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
      });
    });

    describe('error', () => {
      it('should return a status code of 400 and an error message if the error type is MongooseError', async () => {
        MovieDb.prototype.save = jest.fn().mockRejectedValue(ErrorMock.mongooseError);

        await movieController.CreateMovie(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith(
          expect.objectContaining({
            error: responseMock,
          }),
        );

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(400);

        expect(mockNext).not.toHaveBeenCalled();
      });

      it('should call the next function with an error', async () => {
        MovieDb.prototype.save = jest.fn().mockRejectedValue(ErrorMock.error);

        await movieController.CreateMovie(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).not.toHaveBeenCalled();
        expect(mockResponse.status).not.toHaveBeenCalled();

        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(ErrorMock.error);
      });
    });
  });

  describe('GetMovieByGenreName', () => {
    const myTargetGenre = 'MyTargetGenre';
    const expectedMovie = { ...DbMock.movieData[0], genre: [myTargetGenre] };

    describe('success', () => {
      it('should return a successful response with a status code of 200 and body with all movies with target genre', async () => {
        MovieDb.find = jest.fn().mockResolvedValue([expectedMovie]);

        await movieController.GetMovieByGenreName(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith([expectedMovie]);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });

      it('should return a status code of 204 and message if there are no movies found by this genre', async () => {
        MovieDb.find = jest.fn().mockResolvedValue([]);

        await movieController.GetMovieByGenreName(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith(
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
        MovieDb.find = jest.fn().mockRejectedValue(ErrorMock.error);

        await movieController.GetMovieByGenreName(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).not.toHaveBeenCalled();
        expect(mockResponse.status).not.toHaveBeenCalled();

        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(ErrorMock.error);
      });
    });
  });

  describe('GetMovieById', () => {
    describe('success', () => {
      it('should return a successful response with a status code of 200 and body with a correct Movie', async () => {
        const expectedMovie = DbMock.movieData[0];
        MovieDb.findById = jest.fn().mockResolvedValue(expectedMovie);

        await movieController.GetMovieById(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith(expectedMovie);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });

    describe('error', () => {
      it('should return a status code of 404 and an error message if the error type is MongooseError', async () => {
        MovieDb.findById = jest.fn().mockRejectedValue(ErrorMock.mongooseError);

        await movieController.GetMovieById(mockRequest, mockResponse, mockNext);

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
        MovieDb.findById = jest.fn().mockRejectedValue(ErrorMock.error);

        await movieController.GetMovieById(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).not.toHaveBeenCalled();
        expect(mockResponse.status).not.toHaveBeenCalled();

        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(ErrorMock.error);
      });
    });
  });

  describe('DeleteMovieById', () => {
    describe('success', () => {
      it('should return a successful response with a status code of 200 and body with a deleted Movie', async () => {
        const movieToDelete = DbMock.movieData[0];
        MovieDb.findByIdAndDelete = jest.fn().mockResolvedValue(movieToDelete);

        await movieController.DeleteMovieById(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith(
          expect.objectContaining({
            response: { ...responseMock, movie: movieToDelete },
          }),
        );

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });

    describe('error', () => {
      it('should return a status code of 404 and an error message if the Movie by the same id is attempted to be deleted more than once', async () => {
        const MovieToDelete = DbMock.movieData[0];
        MovieDb.findByIdAndDelete = jest.fn().mockResolvedValueOnce(MovieToDelete).mockResolvedValueOnce(null);

        await movieController.DeleteMovieById(mockRequest, mockResponse, mockNext);
        await movieController.DeleteMovieById(mockRequest, mockResponse, mockNext);

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
        MovieDb.findByIdAndDelete = jest.fn().mockRejectedValue(ErrorMock.mongooseError);

        await movieController.DeleteMovieById(mockRequest, mockResponse, mockNext);

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
        MovieDb.findByIdAndDelete = jest.fn().mockRejectedValue(ErrorMock.error);

        await movieController.DeleteMovieById(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).not.toHaveBeenCalled();
        expect(mockResponse.status).not.toHaveBeenCalled();

        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(ErrorMock.error);
      });
    });
  });

  describe('UpdateMovieById', () => {
    describe('success', () => {
      it('should return a successful response with a status code of 200 and body with a deleted Movie', async () => {
        const MovieToUpdate = { ...DbMock.movieData[0], name: ['new Movie name'] };
        MovieDb.findByIdAndUpdate = jest.fn().mockResolvedValue(MovieToUpdate);

        await movieController.UpdateMovieById(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).toHaveBeenCalledTimes(1);
        expect(mockResponse.json).toHaveBeenCalledWith(MovieToUpdate);

        expect(mockResponse.status).toHaveBeenCalledTimes(1);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
      });
    });

    describe('error', () => {
      it('should call the next function with an error', async () => {
        MovieDb.findByIdAndUpdate = jest.fn().mockRejectedValue(ErrorMock.error);

        await movieController.UpdateMovieById(mockRequest, mockResponse, mockNext);

        expect(mockResponse.json).not.toHaveBeenCalled();
        expect(mockResponse.status).not.toHaveBeenCalled();

        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenCalledWith(ErrorMock.error);
      });
    });
  });
});
