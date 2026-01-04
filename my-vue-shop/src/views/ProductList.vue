<template>
  <div class="products-page">

    <div v-if="loading">加载中...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div class="product-list">
      <div class="product-item" v-for="product in products" :key="product.id">
        <img :src="`/goodsimage/${product.pthumbnail.split('/').pop()}`" />
        <h3>{{ product.name }}</h3>
        <p>价格：¥{{ product.price1 }}</p>
        <button @click="handleAddCart(product)">加入购物车</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getGoodsList, addCartItem } from '../api/index.js';

const products = ref([]);
const loading = ref(false);
const error = ref('');

const userId = localStorage.getItem('userId'); // 当前登录用户ID

// 获取商品列表
const fetchGoods = async () => {
  loading.value = true;
  error.value = '';
  try {
    const res = await getGoodsList();
    products.value = res.data || [];
  } catch (err) {
    console.error(err);
    error.value = '加载商品失败';
  } finally {
    loading.value = false;
  }
};

// 加入购物车
const handleAddCart = async (product) => {
  if (!userId) {
    alert('请先登录');
    return;
  }

  try {
    const num = 1; // 默认添加数量 1
    const price = product.price1;
    const goodsId = product.id;

    const res = await addCartItem(userId, goodsId, num, price);
    alert('加入购物车成功');
    // res.data 是当前用户最新购物车内容，可以用作刷新购物车
    console.log('购物车最新列表：', res.data);
  } catch (err) {
    console.error(err);
    alert('加入购物车失败');
  }
};

onMounted(() => {
  fetchGoods();
});
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0 120px;
}

.product-item {
  border: 1px solid #ddd;
  padding: 10px;
  width: 200px;
  box-shadow: 2px 2px 8px #eee;
}

.product-item img {
  width: 100%;
  height: 150px;
  object-fit: contain;
  margin-bottom: 10px;
}

button {
  background-color: #000000;
  color: white;
  border: none;
  padding: 10px 16px;
  cursor: pointer;
  border-radius: 8px;
}

.error {
  color: red;
}
</style>
