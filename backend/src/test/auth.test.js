const request = require('supertest');

const baseURL = 'http://localhost:3000/api';

let cookie;

const login = async () => {
  const auth = { email: 'admin@rd.com', password: 'crumbs' };
  const response = await request(baseURL).post('/auth/login').send(auth);
  cookie = response.get('Set-Cookie');
  return response;
};

const logout = async () => {
  const response = await request(baseURL)
    .post('/auth/logout')
    .set('Cookie', cookie);
  return response;
};

describe('Log in user', () => {
  it('Should notify successful login', async () => {
    const response = await login();

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Successfully authenticated');
  });

  it('should create a cookie', async () => {
    await login();
    expect('set-cookie');

    await logout();
  });
});

describe('Log out user', () => {
  it('Should notify successful logout', async () => {
    const response = await logout();
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
  it('Should respond with current logged in user', async () => {
    await login();
    const response = await request(baseURL)
      .get('/auth/user')
      .set('Cookie', cookie);

    expect(response.body.user).toEqual({
      _id: '62f2ffe5a247e46e3885a500',
      fullName: 'An Admin',
      email: 'admin@rd.com',
      role: 'admin',
    });

    await logout();
  });
});
