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
  <div v-if="movie" class="detail-page">

    <div class="content-wrapper">
      <button class="btn-back" @click="router.back()">← Volver</button>

      <!-- Layout: imagen + info -->
      <div class="movie-layout">
        <div class="movie-img-wrap">
          <img :src="getImageUrl(movie.folder)" :alt="movie.title" class="movie-img" />
        </div>

        <div class="movie-info">
          <h1>{{ movie.title }}</h1>
          <span class="duracion">{{ movie.duracion }}</span>
          <p class="desc-text">{{ movie.desc }}</p>

          <div class="likes-row">
            <button class="btn-like" :class="{ liked }" @click="handleLike" :disabled="!user || liked">
              ❤️ {{ movie.likes }} Me gusta
            </button>
            <span v-if="!user" class="hint-auth">Inicia sesión para interactuar</span>
          </div>
        </div>
      </div>

      <!-- Comentarios -->
      <section class="comments-section">
        <h2>Comentarios ({{ movie.comments.length }})</h2>

        <form v-if="user" @submit.prevent="submitComment" class="comment-form">
          <textarea v-model="newComment" rows="3" placeholder="¿Qué te pareció esta película?"></textarea>
          <button type="submit" class="btn-comment">Publicar comentario</button>
        </form>
        <p v-else class="hint-auth-block">Inicia sesión para dejar un comentario</p>

        <div v-if="movie.comments.length > 0" class="comments-list">
          <div v-for="c in [...movie.comments].reverse()" :key="c.id" class="comment-card">
            <div class="comment-header">
              <span class="comment-avatar">{{ c.user.charAt(0) }}</span>
              <span class="comment-user">{{ c.user }}</span>
              <span class="comment-date">{{ c.date }}</span>
            </div>
            <p class="comment-text">{{ c.text }}</p>
          </div>
        </div>
        <p v-else class="no-comments">Todavía no hay comentarios. ¡Sé el primero!</p>
      </section>
    </div>
  </div>

  <div v-else class="not-found">
    <p>Película no encontrada.</p>
    <button @click="router.push('/productos')">Ver catálogo</button>
  </div>
</template>

<style scoped>
.detail-page {
  color: var(--page-text);
  min-height: 100vh;
}

.content-wrapper {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px 80px;
}

.btn-back {
  background: none;
  color: var(--page-muted);
  border: 1px solid var(--page-border);
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-bottom: 32px;
  transition: all 0.2s;
}

.btn-back:hover { color: var(--page-text); }

.movie-layout {
  display: flex;
  gap: 40px;
  margin-bottom: 56px;
  align-items: flex-start;
}

.movie-img-wrap {
  flex-shrink: 0;
  width: 260px;
}

.movie-img {
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
  border-radius: 6px;
  display: block;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}

.movie-info { flex: 1; }

.movie-info h1 {
  font-size: 2.2rem;
  margin: 0 0 8px 0;
  color: var(--page-text);
}

.duracion {
  color: var(--page-muted);
  font-size: 0.95rem;
  display: block;
  margin-bottom: 20px;
}

.desc-text {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--page-muted);
  margin-bottom: 28px;
}

.likes-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-like {
  background: var(--page-card-bg);
  color: var(--page-text);
  border: 1px solid var(--page-border);
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.btn-like:hover:not(:disabled) { border-color: #ff6600; color: #ff6600; }

.btn-like.liked {
  border-color: #ff4444;
  color: #ff4444;
  cursor: default;
}

.hint-auth { color: var(--page-muted); font-size: 0.85rem; }

.comments-section h2 {
  font-size: 1.3rem;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--page-border);
  color: var(--page-text);
}

.comment-form textarea {
  width: 100%;
  padding: 12px;
  background: var(--page-input-bg);
  border: 1px solid var(--page-border);
  color: var(--page-text);
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.95rem;
  resize: vertical;
  box-sizing: border-box;
}

.comment-form textarea:focus { outline: none; border-color: #ff6600; }

.btn-comment {
  margin-top: 10px;
  padding: 10px 24px;
  background: #ff6600;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-comment:hover { background: #e05500; }

.hint-auth-block {
  color: var(--page-muted);
  font-size: 0.9rem;
  margin-bottom: 24px;
}

.comments-list {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.comment-card {
  background: var(--page-card-bg);
  border: 1px solid var(--page-border);
  border-radius: 6px;
  padding: 16px 20px;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.comment-avatar {
  width: 32px;
  height: 32px;
  background: #ff6600;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.85rem;
  color: white;
  flex-shrink: 0;
}

.comment-user { font-weight: bold; font-size: 0.9rem; color: var(--page-text); }
.comment-date { color: var(--page-muted); font-size: 0.8rem; margin-left: auto; }
.comment-text { color: var(--page-muted); font-size: 0.9rem; line-height: 1.5; margin: 0; }
.no-comments { color: var(--page-muted); font-style: italic; margin-top: 20px; }

.not-found { text-align: center; padding: 100px 20px; }
.not-found button { margin-top: 16px; padding: 10px 24px; background: #ff6600; color: white; border: none; border-radius: 4px; cursor: pointer; }

@media (max-width: 640px) {
  .movie-layout { flex-direction: column; }
  .movie-img-wrap { width: 100%; }
}
</style>
