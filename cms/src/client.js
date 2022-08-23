import axios from 'axios'

let instance

const config ={
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
}

export default {
  setCookie: (cookie) => {
    const cookieHeader = { 'Cookie': cookie}
    Object.assign(config, { headers: cookieHeader })
    instance = axios.create(config)
  },

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

  get: async (type, filter) => await instance({
    method: 'get',
    url: `/${type}`,
  }).catch(err => console.log(err)),

}
