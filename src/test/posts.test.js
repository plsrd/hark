const request = require('supertest');
const configDB = require('./configDB');
require('dotenv').config();
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

describe('GET all posts', () => {
  it('should return all existing posts', async () => {
    const response = await request(baseURL).get('/posts').set('Cookie', cookie);
    const allPosts = await Post.find();
    expect(response.body.length).toEqual(allPosts.length);
  });
});

describe('POST /post creates new post', () => {
  it('should validate body before posting', async () => {
    const invalidPost = {
      title: 'This is invalid',
      isPublished: false,
      content: [{ some: 'content' }],
      author: '62f2ffe5a247e46e3885a501',
    };

    const response = await request(baseURL)
      .post('/posts')
      .set('Cookie', cookie)
      .send(invalidPost);

    expect(response.body.errors[0].msg).toBe(
      'An existing user must be added as author.'
    );
  });

  it('should create a new post', async () => {
    const newPost = {
      title: 'TEST',
      isPublished: false,
      content: [{ test: 'test' }],
      author: process.env.TEST_AUTHOR_ID,
    };

    const initialPostCount = await Post.countDocuments();

    const response = await request(baseURL)
      .post('/posts')
      .set('Cookie', cookie)
      .send(newPost);

    id = response.body.createdPost._id;

    const finalPostCount = await Post.countDocuments();

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Post created');
    expect(initialPostCount).toBe(finalPostCount - 1);
  });
});

describe('GET single post', () => {
  it('should return a given post', async () => {
    const response = await request(baseURL)
      .get(`/posts/${id}`)
      .set('Cookie', cookie);

    const post = await Post.findById(id);

    expect(response.body.title).toBe(post.title);
  });
});

describe('PUT single post', () => {
  it('should edit the given post', async () => {
    const newTitle = 'A new test title';

    await request(baseURL)
      .put(`/posts/${id}`)
      .set('Cookie', cookie)
      .send({
        title: newTitle,
        author: process.env.TEST_AUTHOR_ID,
        isPublished: false,
        content: [{ test: 'test' }],
      });

    const { title } = await Post.findById(id);

    expect(title).toBe(newTitle);
  });
});

describe('DELETE single post', () => {
  it('should delete the specified post', async () => {
    const response = await request(baseURL)
      .delete(`/posts/${id}`)
      .set('Cookie', cookie);

    const post = await Post.findById(id);

    expect(response.body.message).toBe(`Post ${id} deleted`);
    expect(post).toBe(null);
  });
});

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
