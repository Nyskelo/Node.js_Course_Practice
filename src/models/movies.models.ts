import moviesSchema from 'src/schemas/movies.schemas';

export interface Movie {
	id: string;
	title: string;
	description: string;
	releaseDate: string;
	genre: string[];
}

export type MoviesSchema = typeof moviesSchema;
