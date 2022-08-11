const request = require('supertest');
const configDB = require('./src/test/configDB');
const Post = require('./src/models/post');
const Comment = require('./src/models/comment')

const baseURL = 'http://localhost:3000/api';

let cookie;

beforeAll(async () => {
  const response = await request(baseURL)
    .post('/auth/login')
    .send({ email: process.env.TEST_EMAIL, password: process.env.TEST_PASSWORD });
  cookie = response.get('Set-Cookie');

});

afterAll(async () => {
  await request(baseURL).post('/auth/logout').set('Cookie', cookie);
});

configDB();

describe('GET all post comments', () => {
  it('should return all comments on a post', async () => {

    const createPostwithComments = aynsc () => {
      
    }
    const { _id: postId} = await Post.findOne({})
    const response = await request(`posts/${postId}/comments`)
  })
})