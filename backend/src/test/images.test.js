const request = require('supertest');
const configDB = require('./configDB');
const Image = require('../models/image');

jest.setTimeout(6000);

const baseURL = 'http://localhost:3000/api';

let cookie;
let id;

const test = {
  url: 'https://google.com',
  filename: 'test.jpg',
  caption: 'this is a test image',
  alt: 'an image that shows nothing but is actually a test',
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

describe('GET all images', () => {
  it('should get all images', async () => {
    const allImages = await Image.find();

    const response = await request(baseURL)
      .get(`/images`)
      .set('Cookie', cookie);

    expect(response.body.length).toBe(allImages.length);
  });
});
