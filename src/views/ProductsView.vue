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

<template>
  <div class="container-xl py-5">
    <h2 class="fw-bold text-center mb-4" style="font-size:2rem;">Nuestro Catálogo</h2>

    <p v-if="route.query.q" class="text-muted mb-3">
      Resultados para "<strong>{{ route.query.q }}</strong>": {{ filteredMovies.length }} encontradas
    </p>

    <div v-if="filteredMovies.length === 0" class="alert alert-secondary">
      No se encontraron películas.
    </div>

    <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
      <div class="col" v-for="peli in filteredMovies" :key="peli.id">
        <CardProducte :movie="peli" />
      </div>
    </div>
  </div>
</template>
