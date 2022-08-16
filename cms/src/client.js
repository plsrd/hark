import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export default {
  login: async (data) => await instance({
    method: 'post',
    url: '/auth/login',
    withCredentials: true,
    headers: {'Content-Type': 'application/json'},
    data
  }).then(res => res),

  logout: async () => await instance({
    method: 'post',
    url: '/auth/logout',
    withCredentials: true,
    headers: {'Content-Type': 'application/json'},
  }).then(res => res)
}
