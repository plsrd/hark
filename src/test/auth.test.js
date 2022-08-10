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

describe('GET current user', () => {
  let cookie;
  beforeAll(async () => {
    const response = await request(baseURL)
      .post('/auth/login')
      .send({ email: 'admin@rd.com', password: 'crumbs' });
    cookie = response.get('Set-Cookie');
  });
  afterAll(async () => {
    await request(baseURL).post('/auth/logout').set('Cookie', cookie);
  });

  it('Should respond with current logged in user', async () => {
    const response = await request(baseURL)
      .get('/auth/user')
      .set('Cookie', cookie);

    expect(response.body.user).toEqual({
      _id: '62f2ffe5a247e46e3885a500',
      name: 'An Admin',
      email: 'admin@rd.com',
      role: 'admin',
    });
  });
});
