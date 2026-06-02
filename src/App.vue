<script setup>
import { onMounted } from 'vue';
import { RouterView } from "vue-router";
import NavBar from './components/NavBar.vue';
import FooterApp from './components/FooterApp.vue';
import CartDrawer from './components/CartDrawer.vue';
import { useMovieStore } from '@/stores/movieStore';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

const store = useMovieStore();

onMounted(async () => {
  await store.restoreSession();
  await store.fetchMovies();
  createChat({
		webhookUrl: 'http://localhost:5678/webhook/989f083e-2985-4b38-bea9-a48434910ecb/chat'
	});
});
</script>

<template>
  <NavBar />
  <CartDrawer />

  <main class="main-content">
    <RouterView />
  </main>

  <FooterApp />
</template>

<style scoped>
.main-content {
  padding-top: 60px;
  min-height: calc(100vh - 160px);
}

/* Transiciones básicas para el cambio de páginas */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>