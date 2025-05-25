const request = require('supertest');
const app = require('../server');

describe('Backend API', () => {
  it('GET /api/ping should return { pong: true }', async () => {
    const res = await request(app).get('/api/ping');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ pong: true });
  });

  // add more unit tests here…
});
