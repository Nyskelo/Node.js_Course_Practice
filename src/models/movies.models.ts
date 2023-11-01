import mongoose, { Types } from 'mongoose';

import { movieMongooseSchema } from '../schemas/movies.schemas';

export interface Movie {
  _id: Types.ObjectId;
  title: string;
  description: string;
  releaseDate: Date;
  genre: string[];
}

export interface MovieBody {
  title: string;
  description: string;
  releaseDate: string;
  genre: string[];
}

export const MovieDb = mongoose.model('Movie', movieMongooseSchema);
