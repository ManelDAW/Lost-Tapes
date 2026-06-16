<script setup>
import { computed, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMovieStore } from '@/stores/movieStore';
import { useCartStore } from '@/stores/cartStore';
import { getImageUrl } from '@/utils/imageUrl';

const route = useRoute();
const router = useRouter();
const movieStore = useMovieStore();

const movie = computed(() => movieStore.peliculas.find(p => p.id === Number(route.params.id)));
const user = computed(() => movieStore.user);
const cart = useCartStore();
const addedToCart = ref(false);
const liked = ref(false);

onMounted(async () => {
  const result = await movieStore.fetchMovie(Number(route.params.id));
  liked.value = result.user_liked ?? false;
});

const addToCart = () => {
  cart.add(movie.value);
  addedToCart.value = true;
  setTimeout(() => { addedToCart.value = false; }, 2000);
};

const relatedMovies = computed(() => {
  if (!movie.value?.category) return [];
  return movieStore.peliculas
    .filter(p => p.id !== movie.value.id && p.category === movie.value.category)
    .slice(0, 3);
});

const newComment = ref('');

const submitComment = async () => {
  if (!newComment.value.trim()) return;
  await movieStore.addComment(movie.value.id, { text: newComment.value.trim() });
  newComment.value = '';
};

const handleLike = async () => {
  if (liked.value) return;
  const isLiked = await movieStore.toggleLike(movie.value.id);
  liked.value = isLiked;
};
</script>

<template>
  <div v-if="movie" class="container py-5">
    <button class="btn btn-sm btn-outline-secondary mb-4" @click="router.back()">← Volver</button>

    <div class="row g-4 mb-5">
      <div class="col-12 col-md-4 col-lg-3 text-center text-md-start">
        <img :src="getImageUrl(movie)" :alt="movie.title"
             class="img-fluid rounded shadow mx-auto d-block d-md-inline"
             style="aspect-ratio:2/3; object-fit:cover; max-width:260px; width:100%;" />
      </div>
      <div class="col-12 col-md-8 col-lg-9">
        <h1 class="fw-bold mb-1" style="font-size:clamp(1.4rem, 4vw, 2rem); color: var(--page-text);">{{ movie.title }}</h1>
        <p class="mb-2" style="color: var(--page-muted);">{{ movie.duracion }}</p>
        <p class="mb-4 fw-bold" style="font-size:clamp(1.1rem, 3vw, 1.6rem); color: var(--accent);">
          {{ Number(movie.price).toFixed(2) }} €
        </p>
        <p class="mb-4" style="color: var(--page-muted); line-height:1.75;">{{ movie.desc }}</p>

        <div class="d-flex align-items-center gap-3 flex-wrap">
          <button class="btn rounded-pill px-4"
                  :class="liked ? 'btn-danger' : 'btn-outline-secondary'"
                  @click="handleLike"
                  :disabled="!user || liked">
            ❤️ {{ movie.likes }} Me gusta
          </button>
          <button class="btn btn-accent fw-bold rounded-pill px-4" @click="addToCart">
            {{ addedToCart ? '✓ Añadido' : '🛒 Añadir al carrito' }}
          </button>
          <small v-if="!user" style="color: var(--page-muted);">Inicia sesión para interactuar</small>
        </div>
      </div>
    </div>

    <section>
      <h2 class="fw-bold mb-3 pb-2 border-bottom"
          style="font-size:clamp(1rem, 2.5vw, 1.3rem); color: var(--page-text); border-color: var(--page-border) !important;">
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

    <!-- Películas relacionadas -->
    <section v-if="relatedMovies.length > 0" class="mt-5 pt-4 border-top"
             style="border-color: var(--page-border) !important;">
      <h2 class="fw-bold mb-4" style="font-size:clamp(1rem, 2.5vw, 1.3rem); color: var(--page-text);">
        También te puede interesar
      </h2>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        <div class="col" v-for="rel in relatedMovies" :key="rel.id">
          <div class="related-card card h-100" @click="router.push(`/productos/${rel.id}`)"
               style="cursor:pointer; background: var(--page-card-bg); border-color: var(--page-border);">
            <img :src="getImageUrl(rel)" :alt="rel.title" loading="lazy"
                 style="height:140px; object-fit:cover; width:100%;" />
            <div class="card-body py-2 px-3">
              <p class="mb-0 fw-bold small" style="color: var(--page-text);">{{ rel.title }}</p>
              <p class="mb-0 small" style="color: var(--page-muted);">{{ rel.duracion }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div v-else class="text-center py-5">
    <p style="color: var(--page-muted);">Película no encontrada.</p>
    <button class="btn btn-accent mt-3" @click="router.push('/productos')">Ver catálogo</button>
  </div>
</template>

<style scoped>
.related-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}
.related-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.3) !important;
}
</style>
