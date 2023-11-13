import { NextFunction, Request, Response } from 'express';
import { MockProxy, mock } from 'jest-mock-extended';

import errorHandler from './errorHandler.middleware';
import { Error } from './../models/errors.models';
import { ErrorMock, responseMock } from './../__mock__/mock-data';

describe('Error Handler Middleware', () => {
  let mockRequest: MockProxy<Request>;
  let mockResponse: MockProxy<Response>;
  const mockNext: NextFunction = jest.fn();

  const error: Error = {
    status: 499,
    message: 'error',
  };

  beforeEach(() => {
    mockRequest = mock<Request>();
    mockResponse = mock<Response>();

    mockResponse.status.mockReturnThis();
    mockResponse.json.mockReturnThis();
  });

  it('should send the error with the provided status and message', () => {
    errorHandler(error, mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(499);
    expect(mockResponse.json).toHaveBeenCalledWith({ error });
  });

  it('should handle unexpected or internal server errors with a status code of 500 and error message', () => {
    errorHandler(ErrorMock.error, mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: responseMock });
  });
});
