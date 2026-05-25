<script setup>
import { useRouter } from 'vue-router';

defineProps({ movie: Object });

const router = useRouter();

const getImageUrl = (folder) => {
  if (!folder) return '';
  return new URL(`../assets/img/peliculas/${folder}/1.jpg`, import.meta.url).href;
};
</script>

<template>
  <div v-if="movie" class="card-movie" @click="router.push(`/productos/${movie.id}`)" style="cursor:pointer">
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
  background: var(--page-card-bg);
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
  color: var(--page-text);
}

.card-duration {
  font-size: 0.8rem;
  color: var(--page-muted);
}

.card-desc {
  font-size: 0.9rem;
  color: var(--page-muted);
  line-height: 1.4;
  margin: 0;
}
</style>