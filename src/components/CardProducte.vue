<script setup>
defineProps({
  movie: Object
});

const getImageUrl = (folder) => {
  if (!folder) return '';
  // Mantenemos la lógica para buscar la imagen en assets
  return new URL(`../assets/img/peliculas/${folder}/1.jpg`, import.meta.url).href;
};
</script>

<template>
  <!-- El v-if evita que el componente intente leer datos inexistentes -->
  <div v-if="movie" class="card-movie">
    <div class="card-img-container">
      <img :src="getImageUrl(movie.folder)" :alt="movie.title" class="card-img">
    </div>
    <div class="card-body">
      <div class="card-header-info">
        <h3 class="card-title">{{ movie.title }}</h3>
        <span class="card-duration">{{ movie.duracion }}</span>
      </div>
      <p class="card-desc">{{ movie.desc }}</p>
    </div>
  </div>
</template>

<style scoped>
.card-movie {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
}

.card-movie:hover {
  transform: translateY(-5px);
}

.card-img-container {
  width: 100%;
  height: 200px;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  padding: 15px;
  text-align: left;
}

.card-header-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.card-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0;
  color: #333;
}

.card-duration {
  font-size: 0.8rem;
  color: #888;
}

.card-desc {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
  margin: 0;
}
</style>