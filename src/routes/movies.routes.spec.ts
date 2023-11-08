import { request } from './../__mock__/setup-jest';
import { MovieDb } from '../models/movies.models';
import { DbMock } from './../__mock__/mock-data';

describe('Movies endpoints', () => {
  it('GET/movies - can list movies', async () => {
    const expectedMovies = new MovieDb(DbMock.movieData[0]);
    await expectedMovies.save();

    await request.get('/movies/').expect(200);
  });
});
