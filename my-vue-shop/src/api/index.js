// src/api/index.js
import axios from 'axios';

const request = axios.create({
  baseURL: '/api',
  timeout: 5000
});

export const login = (name, password) =>
  request.get('/user/login', { params: { name, password } });

export const register = (name, password) =>
  request.get('/user/register', { params: { name, password } });

export const getGoodsList = () => {
  return request.get('/goods/list');
};