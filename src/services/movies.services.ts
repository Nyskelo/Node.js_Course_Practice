import { Movie, MovieBody, MovieDb } from '../models/movies.models';

export default class MovieService {
  async CreateMovie(movie: MovieBody): Promise<Movie> {
    const movieToAdd = new MovieDb(movie);
    return await movieToAdd.save();
  }

  async GetAllMovies(): Promise<Movie[]> {
    return await MovieDb.find({});
  }

  async GetMovieByGenreName(genreName: string): Promise<Movie[]> {
    return await MovieDb.find({ genre: { $in: [genreName] } });
  }

  async GetMovieById(movieId: string): Promise<Movie | null> {
    return await MovieDb.findById(movieId);
  }

  async DeleteMovieById(movieId: string): Promise<Movie | null> {
    return await MovieDb.findByIdAndDelete(movieId);
  }

  async UpdateMovieById(movieId: string, updatedMovie: Omit<Movie, '_id'>): Promise<Movie | null> {
    return await MovieDb.findByIdAndUpdate(movieId, updatedMovie, { new: true });
  }
}
