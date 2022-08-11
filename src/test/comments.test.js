const request = require('supertest');
const configDB = require('./configDB');
const Post = require('../models/post');
const Comment = require('../models/comment');

const baseURL = 'http://localhost:3000/api';

let cookie;
let id;

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

describe('POST a new comment to a post', () => {
  it('should create a new comment on the specified post', async () => {
    const testComment = {
      author: process.env.TEST_AUTHOR_ID,
      post: process.env.TEST_POST_ID,
      content: [{ test: 'test' }],
    };

    const response = await request(baseURL)
      .post(`/posts/${process.env.TEST_POST_ID}/comments`)
      .set('Cookie', cookie)
      .send(testComment);

    id = response.body.newComment._id;

    const newComment = await Comment.findById(id);

    expect(newComment.content).toEqual(testComment.content);
  });
});
