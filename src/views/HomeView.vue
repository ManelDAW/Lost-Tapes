<script setup>
import { onMounted } from 'vue';
import CarruselApp from '../components/CarruselApp.vue';
import CardProducte from '../components/CardProducte.vue';
import { useMovieStore } from '@/stores/movieStore';

const movieStore = useMovieStore();

// Tomamos las 3 primeras películas de forma reactiva
// Si movieStore.peliculas cambia, esto se actualizará solo
</script>
<template>
  <div class="home-container">
    <h2 class="main-title">New Cult Movies</h2>

    <CarruselApp />

    <!-- Forzamos el renderizado solo cuando hay películas -->
    <div v-if="movieStore.peliculas.length > 0" class="movies-grid">
      <CardProducte 
        v-for="movie in movieStore.peliculas.slice(0, 3)" 
        :key="movie.id" 
        :movie="movie" 
      />
    </div>
  </div>
</template>

<style scoped>
.home-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.main-title {
  font-size: 2.2rem;
  margin: 30px 0;
  font-weight: 800;
}

.movies-grid {
  display: grid !important; /* El !important asegura que nada lo sobreescriba */
  grid-template-columns: repeat(3, 1fr) !important;
  gap: 30px;
  margin-top: 50px;
  padding: 10px;
}

/* Si la pantalla es pequeña (móvil), entonces sí pasamos a 1 columna */
@media (max-width: 900px) {
  .movies-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>