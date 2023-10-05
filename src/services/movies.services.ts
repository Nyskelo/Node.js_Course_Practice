import {Movie} from '../models/movies.models';
import {v4 as uuidv4} from 'uuid';
import {promises as fs} from 'fs';
import path from 'path';

const moviesPath = path.resolve(__dirname, '../db/movies.db.json');

const writeMovies = async (movies: Movie[]) => {
	await fs.writeFile(moviesPath, JSON.stringify(movies), 'utf-8');
};

const readMovies = async () => {
	const data = await fs.readFile(moviesPath, 'utf-8');
	return JSON.parse(data);
};

const getAllMovies = async () => {
	return readMovies();
};

const getMovieById = async (id: string) => {
	const movies = await readMovies();

	return movies.find((movie: Movie) => movie.id === id);
};

const removeMovieById = async (id: string) => {
	const movies = await readMovies();
	const movie = movies.filter((movie: Movie) => movie.id !== id);

	await writeMovies(movie);
};

const addMovie = async (data: Omit<Movie, 'id'>) => {
	const movies = await readMovies();

	const movie = {id: uuidv4(), ...data};
	movies.push(movie);

	await writeMovies(movies);

	return movie;
};

const updateMovieById = async (updatedData: Movie) => {
	const movies = await readMovies();

	const updatedMovies = movies.map((movie: Movie) =>
		movie.id === updatedData.id ? {...movie, ...updatedData} : movie
	);
	const updatedMovie = updatedMovies.find((movie: Movie) => movie.id === updatedData.id);

	await writeMovies(updatedMovies);
	return updatedMovie;
};

export {getAllMovies, getMovieById, removeMovieById, addMovie, updateMovieById};
