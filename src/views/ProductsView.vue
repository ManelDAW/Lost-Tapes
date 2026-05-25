<template>
  <main class="catalogo-wrapper">
    <h2 class="catalogo-title">Nuestro Catálogo</h2>
    <p v-if="route.query.q" class="search-info">
      Resultados para "<strong>{{ route.query.q }}</strong>": {{ filteredMovies.length }} encontradas
    </p>
    <p v-if="filteredMovies.length === 0" class="no-results">No se encontraron películas.</p>
    <div class="movies-grid">
      <CardProducte v-for="peli in filteredMovies" :key="peli.id" :movie="peli" />
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useMovieStore } from '@/stores/movieStore';
import CardProducte from '@/components/CardProducte.vue';

const route = useRoute();
const movieStore = useMovieStore();

const filteredMovies = computed(() => {
  const q = route.query.q?.toLowerCase().trim();
  if (!q) return movieStore.peliculas;
  return movieStore.peliculas.filter(p =>
    p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
  );
});
</script>

<style scoped>
.catalogo-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
}

.catalogo-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 40px;
}

.search-info {
  color: #888;
  font-size: 0.95rem;
  margin-bottom: 20px;
  text-align: left;
}

.no-results {
  color: #888;
  font-style: italic;
  margin-top: 20px;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 900px) {
  .movies-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 560px) {
  .movies-grid { grid-template-columns: 1fr; }
}
</style>