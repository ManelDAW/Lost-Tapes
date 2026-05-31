<script setup>
import { useRouter } from 'vue-router';
import { getImageUrl } from '@/utils/imageUrl';

defineProps({ movie: Object });

const router = useRouter();
</script>

<template>
  <div v-if="movie" class="movie-card card h-100"
       @click="router.push(`/productos/${movie.id}`)">
    <div class="movie-card__img-wrap">
      <img :src="getImageUrl(movie)" :alt="movie.title"
           class="card-img-top movie-card__img" />
      <div class="movie-card__overlay">
        <span>Ver detalle →</span>
      </div>
    </div>
    <div class="card-body d-flex flex-column"
         style="background: var(--page-card-bg); border-color: var(--page-border);">
      <div class="d-flex justify-content-between align-items-start mb-1">
        <h5 class="card-title mb-0 fs-6 fw-bold" style="color: var(--page-text);">{{ movie.title }}</h5>
        <small style="color: var(--page-muted); white-space:nowrap; margin-left:8px;">{{ movie.duracion }}</small>
      </div>
      <p class="card-text small mt-auto" style="color: var(--page-muted); line-height:1.4;">{{ movie.desc }}</p>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  cursor: pointer;
  border-color: var(--page-border);
  background: var(--page-card-bg);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  overflow: hidden;
}

.movie-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.35) !important;
}

.movie-card__img-wrap {
  position: relative;
  overflow: hidden;
}

.movie-card__img {
  height: 200px;
  object-fit: cover;
  transition: transform 0.35s ease;
  display: block;
  width: 100%;
}

.movie-card:hover .movie-card__img {
  transform: scale(1.06);
}

.movie-card__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.6));
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 8px 12px;
  opacity: 0;
  transition: opacity 0.25s ease;
  color: white;
  font-weight: bold;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.movie-card:hover .movie-card__overlay {
  opacity: 1;
}
</style>
