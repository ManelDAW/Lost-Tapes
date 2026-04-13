<template>
  <article class="card pelicula-card h-100" role="article">
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
  pelicula: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.pelicula-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "portada portada"
    "info info"
    "descripcion descripcion";
  gap: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.pelicula-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.pelicula-card .card-img-top {
  grid-area: portada;
  width: 100%;
  border-radius: 6px;
}

.pelicula-card .card-title {
  font-weight: bold;
  font-size: 1.2em;
  color: #333;
}

.pelicula-card .duracion {
  font-size: 0.9em;
  color: #555;
}
</style>