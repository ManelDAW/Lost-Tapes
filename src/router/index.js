import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactForm from '../views/ContactForm.vue'
import ProductsView from '../views/ProductsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/contacto', name: 'contacto', component: ContactForm },
    { path: '/productos', name: 'productos', component: ProductsView },
    { 
      path: '/vender', 
      name: 'vender', 
      component: () => import('../views/AboutView.vue') // Usando AboutView como placeholder para vender
    },
  ],
})

export default router