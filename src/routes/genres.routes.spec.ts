import { request } from './../__mock__/setup-jest';
import { GenreDb } from '../models/genres.models';
import { responseMock } from './../__mock__/mock-data';

describe('Genres endpoints', () => {
  const genreBodyMock = { name: 'genre super name' };

  afterEach(async () => {
    jest.clearAllMocks();
    await GenreDb.deleteMany();
  });

  it('GET/movies/genres endpoint', async () => {
    GenreDb.create(genreBodyMock);

    const res = await request.get('/movies/genres/').expect(200);

    expect(res.body).toBeDefined();
  });

  it('GET/movies/genres/:id endpoint', async () => {
    const genreToGet = new GenreDb(genreBodyMock);
    const expectedGenre = await genreToGet.save();

    const res = await request.get(`/movies/genres/${expectedGenre._id}`).expect(200);

    expect(res.body).toEqual({
      _id: `${expectedGenre._id}`,
      ...genreBodyMock,
    });
  });

  it('POST/movies/genres endpoint', async () => {
    const res = await request.post('/movies/genres/').send(genreBodyMock).expect(201);

    expect(res.body).toBeDefined();
  });

  it('DELETE/movies/genres/:id endpoint', async () => {
    const genreToDelete = new GenreDb(genreBodyMock);
    const expectedGenre = await genreToDelete.save();

    const res = await request.delete(`/movies/genres/${expectedGenre._id}`).expect(200);

    expect(res.body).toEqual({
      response: {
        ...responseMock,
        genre: {
          _id: `${expectedGenre._id}`,
          ...genreBodyMock,
        },
      },
    });
  });

  it('PUT/movies/genres/:id endpoint', async () => {
    const genreToPut = new GenreDb({ name: 'genre' });
    const expectedGenre = await genreToPut.save();

    const res = await request.put(`/movies/genres/${expectedGenre._id}`).send({ name: 'genre super new' }).expect(200);

    expect(res.body).toEqual({
      _id: `${expectedGenre._id}`,
      name: 'genre super new',
    });
  });
});
