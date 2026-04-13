<script setup>
import { RouterLink, RouterView } from "vue-router";
import FooterApp from './components/FooterApp.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/contacto">Contacto</RouterLink>
        <RouterLink to="/productos">Productos</RouterLink>
        <RouterLink to="/vender">Vender</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>

  <footer>
    <div class="wrapper">
      <FooterApp />
    </div>
  </footer>
</template>

<style scoped>
/* Estilo intacto como pediste */
</style>