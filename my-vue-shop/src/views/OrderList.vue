<template>
  <div class="order-page">
    <h1>我的订单</h1>

    <div v-if="loading">加载中...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="orders.length === 0 && !loading">暂无订单</div>

    <div class="order-list">
      <div class="order-item" v-for="order in orders" :key="order.id">
        <h3>订单时间：{{ formatTime(order.orderTime) }}</h3>
        <table class="order-detail">
          <thead>
            <tr>
              <th>商品名</th>
              <th>数量</th>
              <th>成交价</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in order.orderDetail" :key="item.OrderDetailid">
              <td>{{ item.goodsName }}</td>
              <td>{{ parseNums(item.nums).num }}</td>
              <td>¥{{ parseNums(item.nums).dealPrice }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getOrdersByUser } from '../api/index.js';

const orders = ref([]);
const loading = ref(false);
const error = ref('');

const userId = localStorage.getItem('userId');

const fetchOrders = async () => {
  if (!userId) {
    error.value = '用户未登录';
    return;
  }

  loading.value = true;
  error.value = '';
  try {
    const res = await getOrdersByUser(userId);
    orders.value = res.data || [];
  } catch (err) {
    console.error(err);
    error.value = '加载订单失败';
  } finally {
    loading.value = false;
  }
};

// 解析 nums 字段 "1, dealPrice=1300.0" -> {num: 1, dealPrice: 1300.0}
const parseNums = (numsStr) => {
  const [numPart, pricePart] = numsStr.split(',');
  const num = parseInt(numPart.trim());
  const dealPrice = parseFloat(pricePart.split('=')[1]);
  return { num, dealPrice };
};

// 格式化时间为中文格式 
const formatTime = (timeStr) => {
  const date = new Date(timeStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
};

onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
.order-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 20px;
}

.order-item {
  border: 1px solid #ddd;
  padding: 10px;
}

.order-detail {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.order-detail th,
.order-detail td {
  border: 1px solid #ccc;
  padding: 5px 10px;
  text-align: left;
}

.error {
  color: red;
}
</style>
