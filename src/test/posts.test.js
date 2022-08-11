const request = require('supertest');
const configDB = require('./configDB');
const Post = require('../models/post');

const baseURL = 'http://localhost:3000/api';

let cookie;

beforeAll(async () => {
  const response = await request(baseURL)
    .post('/auth/login')
    .send({ email: 'admin@rd.com', password: 'crumbs' });
  cookie = response.get('Set-Cookie');
});

configDB();

describe('GET all posts', () => {
  afterAll(async () => {
    await request(baseURL).post('/auth/logout').set('Cookie', cookie);
  });

  it('should return all existing posts', async () => {
    const response = await request(baseURL).get('/posts').set('Cookie', cookie);
    const allPosts = await Post.find();

    expect(response.body.length).toEqual(allPosts.length);
  });
});

describe('POST /post creates new post', () => {
  let id;

  afterAll(async () => {
    await Post.findByIdAndDelete(id);
    await request(baseURL).post('/auth/logout').set('Cookie', cookie);
  });

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
      title: 'A little test',
      isPublished: true,
      content: [{ some: 'content' }],
      author: '62f2ffe5a247e46e3885a500',
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
  afterAll(async () => {
    await request(baseURL).post('/auth/logout').set('Cookie', cookie);
  });

  it('should return a given post', async () => {
    const postId = '62f30226d7ad1e225b79a47d';
    const response = await request(baseURL)
      .get(`/posts/${postId}`)
      .set('Cookie', cookie);

    const post = await Post.findById(postId).populate('author');

    expect(response.body.title).toBe(post.title);
  });
});

describe('PUT single post', () => {
  const postId = '62f30226d7ad1e225b79a47d';

  afterAll(async () => {
    await request(baseURL).post('/auth/logout').set('Cookie', cookie);
    await Post.findByIdAndUpdate(postId, { title: 'A Little Test' });
  });

  it('should edit the given post', async () => {
    const { author, isPublished, content } = await Post.findById(postId);

    const newTitle = 'A new title';

    await request(baseURL).put(`/posts/${postId}`).set('Cookie', cookie).send({
      title: newTitle,
      author,
      isPublished,
      content,
    });

    const { title } = await Post.findById(postId);

    expect(title).toBe(newTitle);
  });
});

describe('DELETE single post', () => {
  afterAll(async () => {
    await request(baseURL).post('/auth/logout').set('Cookie', cookie);
  });

  it('should delete the specified post', async () => {
    const newPost = await new Post({
      title: 'A little test',
      isPublished: true,
      content: [{ some: 'content' }],
      author: '62f2ffe5a247e46e3885a500',
    }).save();

    id = newPost._id;

    const response = await request(baseURL)
      .delete(`/posts/${id}`)
      .set('Cookie', cookie);

    const post = await Post.findById(id);

    expect(response.body.message).toBe(`Post ${id} deleted`);
    expect(post).toBe(null);
  });
});
