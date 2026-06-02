<script setup>
import CarruselApp from '../components/CarruselApp.vue';
import CardProducte from '../components/CardProducte.vue';
import VideoPromo from '../components/VideoPromo.vue';
import { useMovieStore } from '@/stores/movieStore';

const movieStore = useMovieStore();
</script>

<template>
  <div class="container-xl py-4">
    <h2 class="fw-bold text-center mb-4" style="font-size:2rem;">New Cult Movies</h2>

    <CarruselApp />

    <VideoPromo video="/src/assets/videos/whiteMare.mp4" />

    <div v-if="movieStore.peliculas.length > 0" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-2">
      <div class="col" v-for="movie in movieStore.peliculas.slice(0, 3)" :key="movie.id">
        <CardProducte :movie="movie" />
      </div>
    </div>
  </div>
</template>
