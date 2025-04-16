if (typeof window !== 'undefined') {
    sessionStorage.clear();
  }  

import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/global.css'
import store from './store';

createApp(App)
  .use(store) // Registrando a store Vuex
  .mount('#app');