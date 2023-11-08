import { request } from './../__mock__/setup-jest';

describe('HealthCkeck endpoints', () => {
  it('GET/health-check endpoint', async () => {
    await request.get('/health-check').expect(200);
  });
});
