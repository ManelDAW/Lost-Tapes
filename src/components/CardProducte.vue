<template>
  <article class="card pelicula-card h-100">
    <img :src="pelicula.img" class="card-img-top" :alt="pelicula.title" loading="lazy">
    <div class="card-body">
      <div class="d-flex justify-content-between mb-2">
        <h5 class="card-title">{{ pelicula.title }}</h5>
        <span class="duracion">{{ pelicula.duracion }}</span>
      </div>
      <p class="card-text">{{ pelicula.desc }}</p>
    </div>
  </article>
</template>

<script setup>
defineProps({
  pelicula: Object
})
</script>