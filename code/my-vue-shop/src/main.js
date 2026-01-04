import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index.js'

const style = document.createElement('style')
style.textContent = `
  * {
    margin: 0;
    padding: 0;
  }
  body {
    margin: 0;
    padding: 0;
  }
`
document.head.appendChild(style)

createApp(App).use(router).mount('#app')