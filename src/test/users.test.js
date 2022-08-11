const request = require('supertest');
const configDB = require('./configDB');
const User = require('../models/user');
const Post = require('../models/user');

const baseURL = 'http://localhost:3000/api';

let cookie;
let id;

const testUser = {
  firstName: 'Atest',
  lastName: 'User',
  email: 'test@testaroo.com',
  password: 'amblegram',
  passwordConfirm: 'amblegram',
  role: 'viewer',
};

beforeAll(async () => {
  const response = await request(baseURL).post('/auth/login').send({
    email: process.env.TEST_EMAIL,
    password: process.env.TEST_PASSWORD,
  });
  cookie = response.get('Set-Cookie');
});

afterAll(async () => {
  await request(baseURL).post('/auth/logout').set({ Cookie: cookie });
  await Post.findByIdAndDelete(id);
});

configDB();

describe('Get all users', () => {
  it('should return all users', async () => {
    const response = await request(baseURL)
      .get('/users')
      .set({ Cookie: cookie });

    const users = await User.find();

    expect(response.body.length).toEqual(users.length);
  });
});

describe('POST new user', () => {
  it('should create a new user', async () => {
    const response = await request(baseURL)
      .post('/users')
      .set({ Cookie: cookie })
      .send(testUser);

    id = response.body.newUser._id.toString();

    const newUser = await User.findById(id);

    expect(id).toEqual(newUser._id.toString());
  });
});

describe('PUT a new user', () => {
  it('should edit an existing user', async () => {
    const newName = 'Doodle';
    await request(baseURL)
      .put(`/users/${id}`)
      .set({ Cookie: cookie })
      .send({ ...testUser, firstName: newName });

    const updatedUser = await User.findById(id);

    expect(updatedUser.firstName).toMatch(newName);
  });
});
