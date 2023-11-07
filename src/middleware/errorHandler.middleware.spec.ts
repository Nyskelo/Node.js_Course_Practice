import { NextFunction, Request, Response } from 'express';
import { MockProxy, mock } from 'jest-mock-extended';

import errorHandler from './errorHandler.middleware';
import { Error } from './../models/errors.models';
import { ErrorMock, responseMock } from './../__mock__/mock-data';

describe('Error Handler Middleware', () => {
  let mockRequest: MockProxy<Request>;
  let mockResponse: MockProxy<Response>;
  const mockNext: NextFunction = jest.fn();

  const errorNotFound: Error = {
    status: 499,
    message: 'error',
  };

  beforeEach(() => {
    mockRequest = mock<Request>();
    mockResponse = mock<Response>();

    mockResponse.status.mockReturnThis();
    mockResponse.json.mockReturnThis();
  });

  it('should send the error with the provided status and message when error has a status', () => {
    errorHandler(errorNotFound, mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(499);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: errorNotFound });
  });

  it('should handle unexpected or internal server error and return a 500 error response', () => {
    errorHandler(ErrorMock.error, mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: responseMock });
  });
});
