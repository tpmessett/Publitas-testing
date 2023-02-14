import { createRouter, createWebHistory } from 'vue-router'
import Cart from '@/views/cart.vue'
import Product from '@/views/product.vue'

const routes = [
  {
    path: '/',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
