import { request } from './../__mock__/setup-jest';

describe('NotFoundError Middleware', () => {
  it('should handle requests for non-existent routes', async () => {
    const res = await request.get(`/notfoundpage`);

    expect(res.status).toBe(404);
    expect(res.text).toContain('Page Not Found');
  });
});
