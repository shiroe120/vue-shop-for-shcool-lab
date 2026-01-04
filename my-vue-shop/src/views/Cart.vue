<template>
  <div class="cart-page">
    <h1>购物车</h1>

    <div v-if="loading">加载中...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="cartList.length === 0 && !loading">购物车为空</div>

    <div class="cart-list">
      <div class="cart-item" v-for="item in cartList" :key="item.cardid">
        <img :src="`/goodsimage/${item.thumbnail.split('/').pop()}`" />
        <div class="info">
          <h3>{{ item.name }}</h3>
          <p>单价：¥{{ item.price }}</p>
          <p>数量：{{ item.num }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getCartByUser } from '../api/index.js';

const cartList = ref([]);
const loading = ref(false);
const error = ref('');

const userId = localStorage.getItem('userId'); // 获取当前用户ID

const fetchCart = async () => {
  if (!userId) {
    error.value = '用户未登录';
    return;
  }

  loading.value = true;
  error.value = '';
  try {
    const res = await getCartByUser(userId);
    cartList.value = res.data || [];
  } catch (err) {
    console.error(err);
    error.value = '加载购物车失败';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCart();
});
</script>

<style scoped>
.cart-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px;
}

.cart-item img {
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-right: 20px;
}

.info h3 {
  margin: 0 0 5px 0;
}

.error {
  color: red;
}
</style>
