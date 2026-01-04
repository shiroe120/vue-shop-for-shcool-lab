<template>
  <div class="register-page">
    <h1>注册页面</h1>
    <form @submit.prevent="handleRegister">
      <div>
        <label>用户名：</label>
        <input v-model="username" type="text" required />
      </div>
      <div>
        <label>密码：</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">注册</button>
    </form>
    <p>
      已有账号？<router-link to="/login">登录</router-link>
    </p>
    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '../api';

const router = useRouter();

const username = ref('');
const password = ref('');
const error = ref('');

const handleRegister = async () => {
  error.value = '';
  try {
    const res = await register(username.value, password.value);
    if (res.data === 'OK') {
      alert('注册成功，请登录');
      router.push('/login');
    } else {
      error.value = '注册失败，用户名可能已存在';
    }
  } catch (err) {
    error.value = '网络错误';
    console.error(err);
  }
}
</script>

<style scoped>
.register-page {
  width: 300px;
  margin: 50px auto;
}
form div {
  margin: 10px 0;
}
input {
  width: 100%;
  padding: 5px;
}
button {
  width: 100%;
  padding: 5px;
  background-color: #000000;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
