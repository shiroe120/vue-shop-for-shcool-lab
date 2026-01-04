<template>
  <div class="app">
    <nav class="navbar">
      <router-link to="/products">商品列表</router-link>
      <router-link to="/cart">购物车</router-link>
      <router-link to="/orders">订单列表</router-link>
      <button @click="logout" class="logout-btn">退出登录</button>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('userId');
  router.push('/login');
};
</script>

<style scoped>

.navbar {
  display: flex;
  gap: 20px;
  padding: 15px 20px;
  background-color: #000000;
  margin-bottom: 20px;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.navbar a:hover {
  text-decoration: underline;
}

.logout-btn {
  margin-left: auto;
  background-color: #d8d8d8;
  color: rgb(31, 31, 31);
  border: none;
  padding: 5px 15px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 8px;
}

.logout-btn:hover {
  background-color: #ffffff;
}
</style>
