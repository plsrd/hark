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

    id = response.body._id;

    const uploadedImage = await Image.findById(id);

    expect(response.body.filename).toBe(uploadedImage.filename);
  });
});

describe('GET a specific image', () => {
  it('should return the image specified in params', async () => {
    const response = await request(baseURL)
      .get(`/images/${id}`)
      .set('Cookie', cookie);

    const image = await Image.findById(id);

    expect(response.body.filename).toEqual(image.filename);
  });
});

describe('PUT an edit to an image', () => {
  it('should push edits to an Image document', async () => {
    const response = await request(baseURL)
      .put(`/images/${id}`)
      .set('Cookie', cookie)
      .send({
        alt: 'alt',
        caption: 'caption',
      });

    const updatedImage = await Image.findById(id);

    expect(response.body.alt).toEqual(updatedImage.alt);
  });
});

describe('DELETE an image', () => {
  it('should delete an image', async () => {
    const response = await request(baseURL)
      .delete(`/images/${id}`)
      .set('Cookie', cookie);

    const deletedImage = await Image.findById(id);

    expect(response.body.message).toEqual(`Image ${id} deleted`);
    expect(deletedImage).toBe(null);
  });
});
