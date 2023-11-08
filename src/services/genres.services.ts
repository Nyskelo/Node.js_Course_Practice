import { Genre, GenreBody, GenreDb } from '../models/genres.models';

export default class GenreService {
  async CreateGenre(genre: GenreBody): Promise<Genre> {
    const genreToAdd = new GenreDb(genre);
    return await genreToAdd.save();
  }

  async GetAllGenres(): Promise<Genre[]> {
    return await GenreDb.find({});
  }

  async GetGenreById(genreId: string): Promise<Genre | null> {
    return await GenreDb.findById(genreId);
  }

  async FindGenreByName(genreName: string): Promise<Genre[]> {
    return await GenreDb.find({ name: genreName });
  }

  async DeleteGenreById(genreId: string): Promise<Genre | null> {
    return await GenreDb.findByIdAndDelete(genreId);
  }

  async UpdateGenreById(genreId: string, updatedGenre: GenreBody): Promise<Genre | null> {
    return await GenreDb.findByIdAndUpdate(genreId, updatedGenre, { new: true });
  }
}
