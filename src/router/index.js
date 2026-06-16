import { createRouter, createWebHistory } from 'vue-router'
import { useMovieStore } from '@/stores/movieStore'
import HomeView from '../views/HomeView.vue'
import ContactForm from '../views/ContactForm.vue'
import ProductsView from '../views/ProductsView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/contacto', name: 'contacto', component: ContactForm },
    { path: '/nosotros', name: 'nosotros', component: AboutView },
    { path: '/productos', name: 'productos', component: ProductsView },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/auth/callback', name: 'auth-callback', component: () => import('../views/AuthCallback.vue') },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/vender',
      name: 'vender',
      component: () => import('../views/VenderView.vue'),
      meta: { requiresAuth: true, roles: ['admin', 'vendedor'] }
    },
    {
      path: '/productos/:id',
      name: 'producto-detalle',
      component: () => import('../views/ProductDetailView.vue'),
    },
    {
      path: '/admin/productos',
      name: 'admin-productos',
      component: () => import('../views/AdminProductsView.vue'),
      meta: { requiresAuth: true, roles: ['admin', 'vendedor'] }
    },
    {
      path: '/carrito',
      name: 'carrito',
      component: () => import('../views/CartView.vue'),
    },
  ],
})

// Guard de navegación: protege las rutas según auth y rol
router.beforeEach(async (to) => {
  const store = useMovieStore()
  await store.restoreSession()
  const user = store.user

  if (to.meta.requiresAuth && !user) {
    return { name: 'login' }
  }

  if (to.meta.roles && !to.meta.roles.includes(user?.role)) {
    return { name: 'home' }
  }
})

export default router
