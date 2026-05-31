<script setup>
import { useRouter } from 'vue-router';
import { getImageUrl } from '@/utils/imageUrl';

defineProps({ movie: Object });

const router = useRouter();
</script>

<template>
  <div v-if="movie" class="card h-100 shadow-sm"
       style="cursor:pointer; border-color: var(--page-border); background: var(--page-card-bg);"
       @click="router.push(`/productos/${movie.id}`)">
    <img :src="getImageUrl(movie)" :alt="movie.title"
         class="card-img-top" style="height:200px; object-fit:cover;" />
    <div class="card-body d-flex flex-column">
      <div class="d-flex justify-content-between align-items-start mb-1">
        <h5 class="card-title mb-0 fs-6 fw-bold" style="color: var(--page-text);">{{ movie.title }}</h5>
        <small style="color: var(--page-muted); white-space:nowrap; margin-left:8px;">{{ movie.duracion }}</small>
      </div>
      <p class="card-text small mt-auto" style="color: var(--page-muted); line-height:1.4;">{{ movie.desc }}</p>
    </div>
  </div>
</template>
