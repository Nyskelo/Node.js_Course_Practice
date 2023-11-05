import { requestStub, request } from './setup-jest';

describe('', () => {
  it('gets the test endpoint', async () => {
    requestStub.get.resolves({
      status: 200,
      body: {
        name: 'horror',
        _id: '65476f0393522485d075ba18',
      },
    });

    const response = await request.get('/movies/genress');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      name: 'horror',
      _id: '65476f0393522485d075ba18',
    });
  });
});
