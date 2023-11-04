import * as db from './mock-mongodb';

beforeAll(async () => await db.connect());

afterEach(async () => await db.dropCollections());

afterAll(async () => await db.dropDatabase());
