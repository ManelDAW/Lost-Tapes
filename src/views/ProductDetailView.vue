<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMovieStore } from '@/stores/movieStore';

const route = useRoute();
const router = useRouter();
const movieStore = useMovieStore();

const movie = computed(() => movieStore.peliculas.find(p => p.id === Number(route.params.id)));
const user = computed(() => movieStore.user);

const newComment = ref('');
const liked = ref(false);

const getImageUrl = (folder) => {
  if (!folder) return '';
  return new URL(`../assets/img/peliculas/${folder}/1.jpg`, import.meta.url).href;
};

const submitComment = () => {
  if (!newComment.value.trim()) return;
  movieStore.addComment(movie.value.id, {
    id: Date.now(),
    user: user.value.name,
    text: newComment.value.trim(),
    date: new Date().toLocaleDateString('es-ES'),
  });
  newComment.value = '';
};

const handleLike = () => {
  if (liked.value) return;
  movieStore.toggleLike(movie.value.id);
  liked.value = true;
};
</script>

<template>
  <div v-if="movie" class="container py-5">
    <button class="btn btn-sm btn-outline-secondary mb-4" @click="router.back()">← Volver</button>

    <div class="row g-4 mb-5">
      <div class="col-12 col-md-4 col-lg-3">
        <img :src="getImageUrl(movie.folder)" :alt="movie.title"
             class="img-fluid rounded shadow" style="aspect-ratio:2/3; object-fit:cover; width:100%;" />
      </div>
      <div class="col-12 col-md-8 col-lg-9">
        <h1 class="fw-bold mb-1" style="font-size:2rem; color: var(--page-text);">{{ movie.title }}</h1>
        <p class="mb-3" style="color: var(--page-muted);">{{ movie.duracion }}</p>
        <p class="mb-4" style="color: var(--page-muted); line-height:1.75;">{{ movie.desc }}</p>

        <div class="d-flex align-items-center gap-3 flex-wrap">
          <button class="btn rounded-pill px-4"
                  :class="liked ? 'btn-danger' : 'btn-outline-secondary'"
                  @click="handleLike"
                  :disabled="!user || liked">
            ❤️ {{ movie.likes }} Me gusta
          </button>
          <small v-if="!user" style="color: var(--page-muted);">Inicia sesión para interactuar</small>
        </div>
      </div>
    </div>

    <section>
      <h2 class="fw-bold mb-3 pb-2 border-bottom"
          style="font-size:1.3rem; color: var(--page-text); border-color: var(--page-border) !important;">
        Comentarios ({{ movie.comments.length }})
      </h2>

      <form v-if="user" @submit.prevent="submitComment" class="mb-4">
        <textarea v-model="newComment" rows="3" placeholder="¿Qué te pareció esta película?"
                  class="form-control mb-2"
                  style="background: var(--page-input-bg); border-color: var(--page-border); color: var(--page-text);"></textarea>
        <button type="submit" class="btn btn-accent fw-bold">Publicar comentario</button>
      </form>
      <p v-else class="mb-4" style="color: var(--page-muted); font-size:0.9rem;">
        Inicia sesión para dejar un comentario
      </p>

      <div v-if="movie.comments.length > 0" class="d-flex flex-column gap-3">
        <div v-for="c in [...movie.comments].reverse()" :key="c.id"
             class="card" style="background: var(--page-card-bg); border-color: var(--page-border);">
          <div class="card-body">
            <div class="d-flex align-items-center gap-2 mb-2">
              <div class="rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                   style="width:32px; height:32px; background:#ff6600; color:white; font-size:0.85rem;">
                {{ c.user.charAt(0) }}
              </div>
              <span class="fw-bold small" style="color: var(--page-text);">{{ c.user }}</span>
              <span class="ms-auto small" style="color: var(--page-muted);">{{ c.date }}</span>
            </div>
            <p class="mb-0 small" style="color: var(--page-muted); line-height:1.5;">{{ c.text }}</p>
          </div>
        </div>
      </div>
      <p v-else class="fst-italic" style="color: var(--page-muted);">
        Todavía no hay comentarios. ¡Sé el primero!
      </p>
    </section>
  </div>

  <div v-else class="text-center py-5">
    <p style="color: var(--page-muted);">Película no encontrada.</p>
    <button class="btn btn-accent mt-3" @click="router.push('/productos')">Ver catálogo</button>
  </div>
</template>
