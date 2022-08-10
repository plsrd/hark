const request = require('supertest');

const baseURL = 'http://localhost:3000/api';

describe('Log in user', () => {
  const auth = { email: 'admin@rd.com', password: 'crumbs' };
  afterAll(async () => {
    await request(baseURL).post('/auth/logout');
  });

  it('Should notify successful login', async () => {
    const response = await request(baseURL).post('/auth/login').send(auth);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Successfully authenticated');
  });

  it('should create a cookie', async () => {
    await request(baseURL).post('/auth/login').send(auth);
    expect('set-cookie');
  });
});

describe('Log out user', () => {
  let cookie;
  beforeAll(async () => {
    const response = await request(baseURL)
      .post('/auth/login')
      .send({ email: 'admin@rd.com', password: 'crumbs' });
    cookie = response.get('Set-Cookie');
  });

  it('Should notify successful logout', async () => {
    const response = await request(baseURL)
      .post('/auth/logout')
      .set('Cookie', cookie);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Logout successful');
  });

  it('Should remove JWT cookie', async () => {
    const response = await request(baseURL)
      .post('/auth/logout')
      .set('Cookie', cookie);

    expect(response.headers['set-cookie'][0]).toBe(
      'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
    );
  });
});
