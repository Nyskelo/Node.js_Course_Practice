import { MongooseError } from 'mongoose';

export namespace DbMock {
  export const genreData = [
    {
      _id: '65477eeb669f2fc875fcb0a5',
      name: 'horror',
    },
    {
      _id: '65477ef9669f2fc875fcb0a9',
      name: 'drama',
    },
  ];

  export const movieData = [
    {
      _id: '65424f4c37625f58b284787d',
      title: 'The Lion King 1',
      description: 'Incredible movie description 1',
      releaseDate: '2010-07-16T00:00:00.000Z',
      genre: ['drama', 'comedy', 'horror'],
    },
    {
      _id: '65424fdb8ad4b0f540859bab',
      title: 'The Lion King 2',
      description: 'Incredible movie description 2',
      releaseDate: '2010-07-16T00:00:00.000Z',
      genre: ['drama', 'comedy', 'horror'],
    },
  ];
}

export namespace ErrorMock {
  export const error = new Error('error');

  export const mongooseError = new MongooseError('error');
}

export const responseMock = {
  status: expect.any(Number),
  message: expect.any(String),
};
