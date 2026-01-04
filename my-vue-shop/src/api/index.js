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

export const getCartByUser = (userId) => {
  return request.get(`/cart/listByUser`, { params: { userId } });
};

export const deleteCartItem = (userId, cartId) => {
  return request.get(`/cart/deleteById`, { params: { userId, cartId } });
};

export const getOrdersByUser = (userId) => {
  return request.get('/order/listByUser', { params: { userId } });
};

// 添加商品到购物车
export const addCartItem = (userId, goodsId, num, price) => {
  return request.get('/cart/add', {
    params: { userId, goodsId, num, price }
  });
};

// 生成订单：后端接口要求 GET 参数 userId 和 cartList（逗号分隔的 cartId 列表）
export const addCastOrder = (userId, cartList) => {
  return request.get('/order/addCastOrder', { params: { userId, cartList } });
};