const request = require('supertest');

const baseURL = 'http://localhost:3000/api';

describe('Log in user', () => {
  const auth = { email: 'admin@rd.com', password: 'crumbs' };
  afterAll(async () => {
    await request(baseURL).post('/auth/logout');
  });

  it('Should log user in', async () => {
    const response = await request(baseURL).post('/auth/login').send(auth);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Successfully authenticated');
  });

  it('should create a cookie', async () => {
    const response = await request(baseURL).post('/auth/login').send(auth);
    const cookie = response.get('Set-Cookie');
    console.log(cookie);
    expect('set-cookie');
  });
});
