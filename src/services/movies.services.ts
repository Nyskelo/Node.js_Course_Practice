import { Movie, MovieBody } from '../models/movies.models';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import path from 'path';

const moviesPath: string = path.resolve(__dirname, '../db/movies.db.json');

const writeMovies = async (movies: Movie[]): Promise<void> => {
  await fs.writeFile(moviesPath, JSON.stringify(movies), 'utf-8');
};

const readMovies = async (): Promise<Movie[]> => {
  const data = await fs.readFile(moviesPath, 'utf-8');
  return JSON.parse(data);
};

const getAllMovies = async (): Promise<Movie[]> => {
  return readMovies();
};

const getMovieById = async (id: string): Promise<Movie | undefined> => {
  const movies: Movie[] = await readMovies();

  return movies.find((movie: Movie) => movie.id === id);
};

const removeMovieById = async (id: string): Promise<void> => {
  const movies: Movie[] = await readMovies();
  const movie = movies.filter((movie: Movie) => movie.id !== id);

  await writeMovies(movie);
};

const addMovie = async (data: MovieBody): Promise<Movie> => {
  const movies: Movie[] = await readMovies();

  const newMovie: Movie = { id: uuidv4(), ...data };
  movies.push(newMovie);

  await writeMovies(movies);

  return newMovie;
};

const updateMovieById = async (updatedData: Movie): Promise<Movie | undefined> => {
  const movies: Movie[] = await readMovies();

  const updatedMovies: Movie[] = movies.map((movie: Movie) =>
    movie.id === updatedData.id ? { ...movie, ...updatedData } : movie,
  );
  const updatedMovie: Movie | undefined = updatedMovies.find((movie: Movie) => movie.id === updatedData.id);

  await writeMovies(updatedMovies);
  return updatedMovie;
};

export { getAllMovies, getMovieById, removeMovieById, addMovie, updateMovieById };
