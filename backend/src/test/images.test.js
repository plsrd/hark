const request = require('supertest');
const configDB = require('./configDB');
const Image = require('../models/image');
const fs = require('fs');

jest.setTimeout(6000);

const baseURL = 'http://localhost:3000/api';

let cookie;
let id;

const testImage = `${__dirname}/test.png`;

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

describe('POST a new image', () => {
  it('should post a new image to cloudinary and create an Image document', async () => {
    const response = await request(baseURL)
      .post(`/images`)
      .set('Cookie', cookie)
      .set('content-type', 'multipart/form-data')
      .attach('image', testImage);

    const uploadedImage = Image.find(response._id);

    expect(response.filename).toEqual(uploadedImage.filename);
  });
});
