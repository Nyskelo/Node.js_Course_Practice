import { CallbackHandler } from 'supertest';
import sinon, { SinonStub } from 'sinon';
import supertest from 'supertest';

import app from './../app';
import * as db from './mock-mongodb';
import { RequestStub } from './sinon.models';

export const request = supertest(app);

export let requestStub: Record<string, RequestStub>;

beforeAll(async () => {
  await db.connect();
  requestStub = {
    get: sinon.stub(request, 'get'),
    post: sinon.stub(request, 'post'),
    put: sinon.stub(request, 'put'),
    delete: sinon.stub(request, 'delete'),
  };
});

afterEach(async () => await db.dropCollections());

afterAll(async () => await db.dropDatabase());
