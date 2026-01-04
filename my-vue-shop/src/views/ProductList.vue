<template>
  <div class="products-page">
    <h1>商品列表</h1>

    <div v-if="loading">加载中...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div class="goods-list">
      <div
        class="goods-item"
        v-for="item in goodsList"
        :key="item.id"
      >
        <img :src="`/goodsimage/${item.pthumbnail.split('/').pop()}`" />
        <h3>{{ item.name }}</h3>
        <p>价格：¥ {{ item.price1 }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getGoodsList } from '../api';

const goodsList = ref([]);
const loading = ref(false);
const error = ref('');

const fetchGoods = async () => {
  loading.value = true;
  error.value = '';
  try {
    const res = await getGoodsList();
    goodsList.value = res.data;
  } catch (err) {
    error.value = '商品加载失败';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchGoods();
});
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.goods-item {
  width: 200px;
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.goods-item img {
  width: 100%;
  height: 150px;
  object-fit: contain;
}

.error {
  color: red;
}
</style>
