import { Movie, MovieBody, MovieDB } from '../models/movies.models';

export default class MovieService {
  async CreateMovie(movie: MovieBody): Promise<Movie> {
    const movieToAdd = new MovieDB(movie);
    return await movieToAdd.save();
  }

  async GetAllMovies(): Promise<Movie[]> {
    return await MovieDB.find({});
  }

  async GetMovieById(movieId: string): Promise<Movie | null> {
    return await MovieDB.findById(movieId);
  }

  async DeleteMovieById(movieId: string): Promise<Movie | null> {
    return await MovieDB.findByIdAndDelete(movieId);
  }

  async UpdateMovieById(movieId: string, updatedMovie: Movie): Promise<Movie | null> {
    return await MovieDB.findByIdAndUpdate(movieId, updatedMovie, { new: true });
  }
}
