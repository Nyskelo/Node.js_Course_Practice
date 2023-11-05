import { SinonStub } from 'sinon';
import { CallbackHandler } from 'supertest';

export type RequestStub = SinonStub<[string, CallbackHandler?], unknown>;
