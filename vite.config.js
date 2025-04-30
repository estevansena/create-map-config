import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { saveToStorage } from './src/utils/storage'; 

// https://vite.dev/config/
export default defineConfig({
  base: '/create-map-config/', //substitua pelo nome do seu repositório
  plugins: [vue()],
})
