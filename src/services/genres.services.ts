import { Genre, GenreDB } from '../models/genres.models';

export default class GenreService {
  async CreateGenre(genre: Genre): Promise<Genre> {
    const genreToAdd = new GenreDB(genre);
    return await genreToAdd.save();
  }

  async GetAllGenres(): Promise<Genre[]> {
    return await GenreDB.find({});
  }

  async GetGenreById(genreId: string): Promise<Genre | null> {
    return await GenreDB.findById(genreId);
  }

  async FindGenreByName(genreName: string): Promise<Genre[]> {
    return await GenreDB.find({ name: genreName });
  }

  async DeleteGenreById(genreId: string): Promise<Genre | null> {
    return await GenreDB.findByIdAndDelete(genreId);
  }

  async UpdateGenreById(genreId: string, updatedGenre: Genre): Promise<Genre | null> {
    return await GenreDB.findByIdAndUpdate(genreId, updatedGenre, { new: true });
  }
}
