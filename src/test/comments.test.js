const request = require('supertest');
const configDB = require('./configDB');
const Post = require('../models/post');
const Comment = require('../models/comment');

const baseURL = 'http://localhost:3000/api';

let cookie;

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

describe('GET all post comments', () => {
  it('should return all comments on a post', async () => {
    const allPostComments = await Comment.find({
      post: process.env.TEST_POST_ID,
    });
    const response = await request(baseURL)
      .get(`/posts/${process.env.TEST_POST_ID}/comments`)
      .set('Cookie', cookie);

    expect(response.body.length).toBe(allPostComments.length);
  });
});
