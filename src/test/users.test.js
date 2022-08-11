const request = require('supertest');
const configDB = require('./configDB');
const User = require('../models/user');
const Post = require('../models/user');

const baseURL = 'http://localhost:3000/api';

let cookie;
let users;

beforeAll(async () => {
  const response = await request(baseURL).post('/auth/login').send({
    email: process.env.TEST_EMAIL,
    password: process.env.TEST_PASSWORD,
  });
  cookie = response.get('Set-Cookie');
});

afterAll(async () => {
  await request(baseURL).post('/auth/logout').set('Cookie', cookie);
});

configDB();

describe('Get all users', () => {
  it('should return all users', async () => {
    const response = await request(baseURL)
      .get('/users')
      .set({ Cookie: cookie });

    users = await User.find();

    expect(response.body.length).toEqual(users.length);
  });
});
