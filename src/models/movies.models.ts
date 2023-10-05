export interface Movie {
	id: string;
	title: string;
	description: string;
	releaseDate: string;
	genre: string[];
}

export interface MovieBody {
	title: string;
	description: string;
	releaseDate: string;
	genre: string[];
}
