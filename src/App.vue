<script setup>
import { onMounted } from 'vue';
import { RouterView } from "vue-router";
import NavBar from './components/NavBar.vue';
import FooterApp from './components/FooterApp.vue';
import { useMovieStore } from '@/stores/movieStore';

const store = useMovieStore();

onMounted(async () => {
  await store.restoreSession();
  await store.fetchMovies();
});
</script>

<template>
  <NavBar />

  <main class="main-content">
    <RouterView />
  </main>

  <FooterApp />
</template>

<style>
.main-content {
  padding-top: 70px; /* Altura del navbar Bootstrap fixed-top */
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