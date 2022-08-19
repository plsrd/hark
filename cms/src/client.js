import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

export default {
  login: async (data) => await instance({
    method: 'post',
    url: '/auth/login',
    headers: {'Content-Type': 'application/json'},
    data
  }),

  logout: async () => await instance({
    method: 'post',
    url: '/auth/logout',
    headers: {'Content-Type': 'application/json'},
  }),

  getAllContent: async () => await instance({
    method: 'get',
    url: '/all',
    headers: {'Content-Type': 'application/json'},
  }),
}
