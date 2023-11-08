import supertest from 'supertest';

import app from './../app';
import * as db from './mock-mongodb';

export const request = supertest(app);

beforeAll(async () => {
  await db.connect();
});

afterAll(async () => await db.dropDatabase());
