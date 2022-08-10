const request = require('supertest');
const configDB = require('./configDB');
const Post = require('../models/post');

const baseURL = 'http://localhost:3000/api';

describe('GET all posts', () => {
  let cookie;

  configDB();

  beforeAll(async () => {
    const response = await request(baseURL)
      .post('/auth/login')
      .send({ email: 'admin@rd.com', password: 'crumbs' });
    cookie = response.get('Set-Cookie');
  });

  afterAll(async () => {
    await request(baseURL).post('/auth/logout').set('Cookie', cookie);
  });

  it('should return all existing posts', async () => {
    const response = await request(baseURL).get('/posts').set('Cookie', cookie);
    const allPosts = await Post.find();

    expect(response.body.length).toEqual(allPosts.length);
  });
});
