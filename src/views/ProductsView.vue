<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMovieStore } from '@/stores/movieStore';
import CardProducte from '@/components/CardProducte.vue';

const route = useRoute();
const router = useRouter();
const movieStore = useMovieStore();

const PER_PAGE = 6;
const currentPage = ref(1);
const selectedCategory = ref('');

// Resetear página al cambiar filtros
watch([() => route.query.q, selectedCategory], () => { currentPage.value = 1; });

const categories = computed(() => {
  const cats = movieStore.peliculas.map(p => p.category).filter(Boolean);
  return [...new Set(cats)].sort();
});

const filteredMovies = computed(() => {
  let list = movieStore.peliculas;
  const q = route.query.q?.toLowerCase().trim();
  if (q) list = list.filter(p =>
    p.title?.toLowerCase().includes(q) || p.desc?.toLowerCase().includes(q)
  );
  if (selectedCategory.value) list = list.filter(p => p.category === selectedCategory.value);
  return list;
});

const totalPages = computed(() => Math.max(1, Math.ceil(filteredMovies.value.length / PER_PAGE)));

const paginatedMovies = computed(() => {
  const start = (currentPage.value - 1) * PER_PAGE;
  return filteredMovies.value.slice(start, start + PER_PAGE);
});

const clearFilters = () => {
  selectedCategory.value = '';
  router.push({ path: '/productos' });
};
</script>

<template>
  <div class="container-xl py-5">
    <h2 class="fw-bold text-center mb-4" style="font-size:2rem; color: var(--page-text);">Nuestro Catálogo</h2>

    <!-- Filtros -->
    <div class="d-flex flex-wrap gap-2 align-items-center mb-4">
      <select v-model="selectedCategory" class="form-select form-select-sm"
              style="max-width:200px; background: var(--page-input-bg); border-color: var(--page-border); color: var(--page-text);">
        <option value="">Todas las categorías</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>

      <button v-if="selectedCategory || route.query.q" class="btn btn-sm btn-outline-secondary" @click="clearFilters">
        Limpiar filtros
      </button>

      <span class="ms-auto small" style="color: var(--page-muted);">
        {{ filteredMovies.length }} película{{ filteredMovies.length !== 1 ? 's' : '' }}
        <template v-if="route.query.q"> para "{{ route.query.q }}"</template>
      </span>
    </div>

    <div v-if="movieStore.loading" class="text-center py-5">
      <div class="spinner-border" style="color: var(--accent);" role="status"></div>
    </div>

    <div v-else-if="paginatedMovies.length === 0" class="alert alert-secondary">
      No se encontraron películas.
    </div>

    <div v-else>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        <div class="col" v-for="peli in paginatedMovies" :key="peli.id">
          <CardProducte :movie="peli" />
        </div>
      </div>

      <!-- Paginación -->
      <nav v-if="totalPages > 1" class="mt-5 d-flex justify-content-center" aria-label="Paginación del catálogo">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">‹</button>
          </li>
          <li v-for="p in totalPages" :key="p" class="page-item" :class="{ active: p === currentPage }">
            <button class="page-link" @click="currentPage = p">{{ p }}</button>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages">›</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
