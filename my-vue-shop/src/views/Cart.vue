<template>
  <div class="cart-page">
    <h1>购物车</h1>

    <div v-if="loading">加载中...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="cartList.length === 0 && !loading">购物车为空</div>

    <div class="cart-controls" v-if="cartList.length > 0">
      <label><input type="checkbox" v-model="selectAll" @change="toggleSelectAll" /> 全选</label>
      <button @click="createOrder" :disabled="selected.length===0">生成订单（{{ selected.length }}）</button>
    </div>

    <div class="cart-list">
      <div class="cart-item" v-for="item in cartList" :key="item.cardid">
        <input type="checkbox" :value="String(item.cardid)" v-model="selected" />
        <img :src="`/goodsimage/${item.thumbnail.split('/').pop()}`" />
        <div class="info">
          <h3>{{ item.name }}</h3>
          <p>单价：¥{{ item.price }}</p>
          <p>数量：{{ item.num }}</p>
          <button @click="handleDelete(item.cardid)">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { getCartByUser, deleteCartItem, addCastOrder } from '../api/index.js';
import { useRouter } from 'vue-router';

const cartList = ref([]);
const loading = ref(false);
const error = ref('');

const selected = ref([]);
const selectAll = ref(false);

const router = useRouter();

const userId = localStorage.getItem('userId'); // 当前用户ID

// 获取购物车
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

// 删除单个商品
const handleDelete = async (cartId) => {
  if (!confirm('确定删除该商品吗？')) return;

  try {
    const res = await deleteCartItem(userId, cartId);
    cartList.value = res.data || []; // 更新购物车列表
    // 同步清理已选中项
    selected.value = selected.value.filter(id => id !== String(cartId));
  } catch (err) {
    console.error(err);
    alert('删除失败');
  }
};

// 切换全选
const toggleSelectAll = () => {
  if (selectAll.value) {
    selected.value = cartList.value.map(i => String(i.cardid));
  } else {
    selected.value = [];
  }
};

// 当 cartList 改变时，若选中项不在列表中则移除
watch(cartList, (newList) => {
  const ids = newList.map(i => String(i.cardid));
  selected.value = selected.value.filter(id => ids.includes(id));
  selectAll.value = selected.value.length > 0 && selected.value.length === ids.length;
});

// 生成订单：调用后端接口并跳转到订单页
const createOrder = async () => {
  if (!userId) {
    alert('请先登录');
    return;
  }
  if (selected.value.length === 0) {
    alert('请至少选择一个商品');
    return;
  }

  const cartListParam = selected.value.join(',');
  try {
    loading.value = true;
    const res = await addCastOrder(userId, cartListParam);
    // 后端返回当前用户全部订单，跳转到订单页查看
    router.push('/orders');
  } catch (err) {
    console.error(err);
    alert('生成订单失败，请重试');
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

button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #f56c6c;
  color: white;
  border: none;
  cursor: pointer;
}

.error {
  color: red;
}
</style>
