<template>
  <div id="mainCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button v-for="(slide, i) in movieStore.peliculas" 
              :key="'ind-'+i" type="button" 
              data-bs-target="#mainCarousel"
              :class="{active: i === 0}" :data-bs-slide-to="i"></button>
    </div>
    <div class="carousel-inner">
      <div v-for="(slide, i) in movieStore.peliculas" :key="slide.id" 
           :class="['carousel-item', {active: i === 0}]">
        <img :src="slide.img" class="d-block w-100" :alt="slide.title" loading="lazy">
        <div class="carousel-caption d-none d-md-block text-start">
          <h5>{{ slide.title }}</h5>
          <p>{{ slide.desc }}</p>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Anterior</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Siguiente</span>
    </button>
  </div>
</template>

<script setup>
import { useMovieStore } from '@/stores/movieStore';
const movieStore = useMovieStore();
</script>