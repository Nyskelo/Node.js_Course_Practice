import { request } from './../__mock__/setup-jest';
import { MovieDb } from '../models/movies.models';
import { DbMock, responseMock } from './../__mock__/mock-data';

describe('Movies endpoints', () => {
  let { title, description, releaseDate, genre } = DbMock.movieData[0];
  const movieBodyMock = { title, description, releaseDate, genre };

  afterEach(async () => {
    jest.clearAllMocks();
    await MovieDb.deleteMany();
  });

  it('GET/movies endpoint', async () => {
    MovieDb.create(movieBodyMock);

    const res = await request.get('/movies/').expect(200);

    expect(res.body).toBeDefined();
  });

  it('GET/movies/:id endpoint', async () => {
    const movieToGet = new MovieDb(movieBodyMock);
    const expectedMovie = await movieToGet.save();

    const res = await request.get(`/movies/${expectedMovie._id}`).expect(200);

    expect(res.body).toEqual({
      _id: `${expectedMovie._id}`,
      ...movieBodyMock,
    });
  });

  it('GET/movies/genre/:genreName endpoint', async () => {
    const targetGenreName = 'genre name';
    MovieDb.create([movieBodyMock, { ...movieBodyMock, genre: [targetGenreName, ...movieBodyMock.genre] }]);

    const res = await request.get(`/movies/genre/${targetGenreName}`).expect(200);

    expect(res.body).toBeDefined();
  });

  it('POST/movies endpoint', async () => {
    const res = await request.post('/movies/').send(movieBodyMock).expect(201);

    expect(res.body).toBeDefined();
  });

  it('DELETE/movies/:id endpoint', async () => {
    const movieToDelete = new MovieDb(movieBodyMock);
    const expectedMovie = await movieToDelete.save();

    const res = await request.delete(`/movies/${expectedMovie._id}`).expect(200);

    expect(res.body).toEqual({
      response: {
        ...responseMock,
        movie: {
          _id: `${expectedMovie._id}`,
          ...movieBodyMock,
        },
      },
    });
  });

  it('PUT/movies/:id endpoint', async () => {
    const movieToPut = new MovieDb(movieBodyMock);
    const expectedMovie = await movieToPut.save();

    const res = await request.put(`/movies/${expectedMovie._id}`).send(movieBodyMock).expect(200);

    expect(res.body).toEqual({
      _id: `${expectedMovie._id}`,
      ...movieBodyMock,
    });
  });
});
