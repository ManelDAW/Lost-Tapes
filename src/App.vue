<script setup>
import { RouterView } from "vue-router";
import NavBar from './components/NavBar.vue';
import FooterApp from './components/FooterApp.vue';
import VideoPromo from "./components/VideoPromo.vue";
</script>

<template>
  <NavBar />

  <main class="main-content">
    <RouterView />
    <VideoPromo
    video="/src/assets/videos/whiteMare.mp4" 
    />
  </main>

  <FooterApp />
</template>

<style>
.main-content {
  padding-top: 80px;
  /* Ajusta según la altura de tu NavBar */
  min-height: calc(100vh - 160px);
  /* Asegura que el footer no flote en páginas cortas */
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