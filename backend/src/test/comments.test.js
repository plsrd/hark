const request = require('supertest');
const configDB = require('./configDB');
const Post = require('../models/post');
const Comment = require('../models/comment');

jest.setTimeout(6000);

const baseURL = 'http://localhost:3000/api';

let cookie;
let id;

const testComment = {
  author: process.env.TEST_AUTHOR_ID,
  post: process.env.TEST_POST_ID,
  content: [{ test: 'test' }],
  isApproved: false,
};

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
  it('should validate body before posting', async () => {
    const invalidComment = {
      ...testComment,
      author: '62f558c0a3659c531e20816d',
    };

    const response = await request(baseURL)
      .post(`/posts/${process.env.TEST_POST_ID}/comments`)
      .set('Cookie', cookie)
      .send(invalidComment);

    expect(response.body.errors[0].msg).toBe('Author must be an existing user');
  });

  it('should create a new comment on the specified post', async () => {
    const response = await request(baseURL)
      .post(`/posts/${process.env.TEST_POST_ID}/comments`)
      .set('Cookie', cookie)
      .send(testComment);

    id = response.body.newComment._id;

    const newComment = await Comment.findById(id);

    expect(newComment._id.toString()).toMatch(id);
  });
});

describe('GET a comment', () => {
  it('should return the comment from a specified post', async () => {
    const response = await request(baseURL)
      .get(`/posts/${process.env.TEST_POST_ID}/comments/${id}`)
      .set('Cookie', cookie);

    expect(response.body._id).toMatch(id);
  });
});

describe('PUT an edit to a comment', () => {
  it('should change the content of the comment', async () => {
    const editedComment = {
      ...testComment,
      content: [{ else: 'something' }],
    };

    await request(baseURL)
      .put(`/posts/${process.env.TEST_POST_ID}/comments/${id}`)
      .set('Cookie', cookie)
      .send(editedComment);

    const updatedComment = await Comment.findById(id);

    expect(updatedComment.content[0]).toMatchObject(editedComment.content[0]);
  });
});

describe('DELETE a comment', () => {
  it('should delete the specified comment', async () => {
    await request(baseURL)
      .delete(`/posts/${process.env.TEST_POST_ID}/comments/${id}`)
      .set('Cookie', cookie);

    const deletedComment = await Comment.findById(id);

    expect(deletedComment).toBe(null);
  });
});
