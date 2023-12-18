import { Response, Request, NextFunction } from 'express';
import { MockProxy, mock } from 'jest-mock-extended';

import { JoiValidationFn } from '../models/joi-validate.models';
import { validateMiddleware } from './validate.middleware';
import { responseMock } from './../__mock__/mock-data';

describe('Validation Middleware', () => {
  let joiValidationFnMock: JoiValidationFn<Record<string, unknown>>;
  let mockRequest: MockProxy<Request>;
  let mockResponse: MockProxy<Response>;
  const mockNext: NextFunction = jest.fn();

  const errorResponse = {
    status: 400,
    details: [{ message: 'Validation failed' }],
  };

  beforeEach(() => {
    mockRequest = mock<Request>();
    mockResponse = mock<Response>();

    mockResponse.status.mockReturnThis();
    mockResponse.json.mockReturnThis();
  });

  it('should handle error if Joi Validation fails', () => {
    joiValidationFnMock = jest.fn().mockReturnValue({ error: errorResponse });

    validateMiddleware(joiValidationFnMock)(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({ error: responseMock }));

    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should call next if Joi Validation passes', () => {
    joiValidationFnMock = jest.fn().mockReturnValue({ response: 'success!' });

    validateMiddleware(joiValidationFnMock)(mockRequest, mockResponse, mockNext);

    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();

    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});
