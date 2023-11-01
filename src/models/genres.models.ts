import mongoose, { Types } from 'mongoose';

import { genreMongooseSchema } from '../schemas/genres.schemas';

export interface Genre {
  _id: Types.ObjectId;
  name: string;
}

export interface GenreBody {
  name: string;
}

export const GenreDb = mongoose.model('Genre', genreMongooseSchema);
