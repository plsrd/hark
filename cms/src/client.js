import axios from 'axios';

const config = {
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
};

let instance = axios.create(config);

export default {
  setCookie: cookie => {
    Object.assign(config, { headers: { Cookie: cookie } });
    instance = axios.create(config);
  },

  login: async data =>
    await instance({
      method: 'post',
      url: '/auth/login',
      headers: { 'Content-Type': 'application/json' },
      data,
    }),

  logout: async () =>
    await instance({
      method: 'post',
      url: '/auth/logout',
      headers: { 'Content-Type': 'application/json' },
    }),

  get: async params => {
    const { type, id, sort } = params;
    return await instance({
      method: 'get',
      url: `/${type}${id ? `/${id}` : ''}${sort ? `?sort=${sort}` : ''}`,
    }).catch(err => console.log(err));
  },

  put: async (type, id, data) =>
    await instance({
      headers: { 'Content-Type': 'application/json' },
      method: 'put',
      url: `/${type}${id ? `/${id}` : ''}`,
      data,
    }).catch(err => console.log(err)),

  post: async (type, data) =>
    await instance({
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      url: `/${type}`,
      data,
    }).catch(err => console.log(err)),

  delete: async (type, id) =>
    await instance({
      headers: { 'Content-Type': 'application/json' },
      method: 'delete',
      url: `/${type}/${id}`,
    }).catch(err => console.log(err)),

  uploadImage: async data =>
    await instance({
      headers: { 'Content-Type': 'multipart/form-data' },
      method: 'post',
      url: '/images',
      data,
    }).catch(err => console.log(err)),
};
