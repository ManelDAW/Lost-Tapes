<template>
  <main class="container mt-5">
    <h2 class="section-title mb-4">Nuestro Catálogo</h2>
    <div class="row g-4">
      <div v-for="peli in movieStore.peliculas" :key="peli.id" class="col-12 col-md-6 col-lg-4">
        <CardProducte :pelicula="peli" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { useMovieStore } from '@/stores/movieStore';
import CardProducte from '@/components/CardProducte.vue';

const movieStore = useMovieStore();
</script>