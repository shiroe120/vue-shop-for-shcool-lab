<template>
  <div class="app">
    <nav class="navbar">
      <router-link to="/products">商品列表</router-link>
      <router-link to="/cart">购物车</router-link>
      <router-link to="/orders">订单列表</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>

.navbar {
  display: flex;
  gap: 20px;
  padding: 15px 20px;
  background-color: #42b983;
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
</style>
