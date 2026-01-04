<template>
  <div class="login-page">
    <h1>登录页面</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label>用户名：</label>
        <input v-model="username" type="text" required />
      </div>
      <div>
        <label>密码：</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">登录</button>
    </form>
    <p>
      没有账号？<router-link to="/register">注册</router-link>
    </p>
    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../api';

const router = useRouter();

const username = ref('');
const password = ref('');
const error = ref('');

const handleLogin = async () => {
  error.value = '';
  try {
    const res = await login(username.value, password.value);
    const userId = res.data;

    if (userId === 'invalid') {
      error.value = '用户名或密码错误';
      return;
    }

    if (userId) {
      localStorage.setItem('userId', userId);
      router.push('/products');
    } else {
      error.value = '登录失败，请稍后重试';
    }
  } catch (err) {
    error.value = '网络错误';
    console.error(err);
  }
};

</script>

<style scoped>
.login-page {
  width: 500px;
  margin: 50px auto;
}
form div {
  margin: 15px 0;
}
input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-size: 16px;
}
button {
  width: 100%;
  padding: 12px;
  background-color: #000000;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
}
</style>
