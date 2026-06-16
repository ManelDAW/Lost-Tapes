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
const priceFilter = ref('all');
const sortBy = ref('default');
const searchInput = ref(route.query.q ?? '');
const localSearch = ref(route.query.q ?? '');

const PRICE_FILTERS = [
  { key: 'all',    label: 'Todos' },
  { key: 'low',    label: 'Menos de 15 €' },
  { key: 'mid',    label: '15 € – 20 €' },
  { key: 'high',   label: 'Más de 20 €' },
];

// Debounce: espera 300ms tras dejar de escribir antes de filtrar
let searchTimeout = null;
watch(searchInput, (value) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => { localSearch.value = value; }, 300);
});

watch([localSearch, priceFilter, sortBy], () => { currentPage.value = 1; });

const filteredMovies = computed(() => {
  let list = [...movieStore.peliculas];

  const q = localSearch.value.toLowerCase().trim();
  if (q) list = list.filter(p =>
    p.title?.toLowerCase().includes(q) || p.desc?.toLowerCase().includes(q)
  );

  if (priceFilter.value === 'low')  list = list.filter(p => Number(p.price) < 15);
  if (priceFilter.value === 'mid')  list = list.filter(p => Number(p.price) >= 15 && Number(p.price) <= 20);
  if (priceFilter.value === 'high') list = list.filter(p => Number(p.price) > 20);

  if (sortBy.value === 'price-asc')  list.sort((a, b) => Number(a.price) - Number(b.price));
  if (sortBy.value === 'price-desc') list.sort((a, b) => Number(b.price) - Number(a.price));
  if (sortBy.value === 'name')       list.sort((a, b) => a.title.localeCompare(b.title));

  return list;
});

const hasFilters = computed(() => priceFilter.value !== 'all' || sortBy.value !== 'default' || searchInput.value.trim());

const totalPages = computed(() => Math.max(1, Math.ceil(filteredMovies.value.length / PER_PAGE)));

const paginatedMovies = computed(() => {
  const start = (currentPage.value - 1) * PER_PAGE;
  return filteredMovies.value.slice(start, start + PER_PAGE);
});

const clearFilters = () => {
  clearTimeout(searchTimeout);
  priceFilter.value = 'all';
  sortBy.value = 'default';
  searchInput.value = '';
  localSearch.value = '';
  router.push({ path: '/productos' });
};
</script>

<template>
  <div class="container-xl py-5">
    <h1 class="fw-bold text-center mb-5" style="font-size:clamp(1.4rem, 4vw, 2rem); color:var(--page-text);">Nuestro Catálogo</h1>

    <!-- Barra de filtros -->
    <div class="filter-bar mb-3">

      <!-- Precio: pills -->
      <div class="filter-group">
        <span class="filter-label">Precio</span>
        <div class="filter-pills">
          <button
            v-for="f in PRICE_FILTERS" :key="f.key"
            class="filter-pill"
            :class="{ 'filter-pill--active': priceFilter === f.key }"
            @click="priceFilter = f.key">
            {{ f.label }}
          </button>
        </div>
      </div>

      <!-- Ordenar: select estilado -->
      <div class="filter-group ms-auto">
        <span class="filter-label">Ordenar</span>
        <select v-model="sortBy" class="filter-select">
          <option value="default">Por defecto</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
          <option value="name">Nombre A–Z</option>
        </select>
      </div>

    </div>

    <!-- Buscador + contador -->
    <div class="search-row mb-5">
      <div class="search-wrap">
        <span class="search-icon">🔍</span>
        <input
          v-model="searchInput"
          type="text"
          class="search-input"
          placeholder="Buscar por título o descripción..." />
        <button v-if="searchInput" class="search-clear" @click="searchInput = ''">✕</button>
      </div>
      <div class="d-flex align-items-center gap-3">
        <button v-if="hasFilters" class="filter-clear" @click="clearFilters">✕ Limpiar todo</button>
        <span class="filter-count">
          {{ filteredMovies.length }} película{{ filteredMovies.length !== 1 ? 's' : '' }}
          <template v-if="localSearch.trim()"> para "{{ localSearch }}"</template>
        </span>
      </div>
    </div>

    <!-- Spinner -->
    <div v-if="movieStore.loading" class="text-center py-5">
      <div class="spinner-border" style="color:var(--accent);" role="status"></div>
    </div>

    <!-- Sin resultados -->
    <div v-else-if="paginatedMovies.length === 0" class="text-center py-5">
      <p style="color:var(--page-muted);">No se encontraron películas con esos filtros.</p>
      <button class="btn btn-outline-secondary mt-2" @click="clearFilters">Limpiar filtros</button>
    </div>

    <!-- Grid -->
    <div v-else>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        <div class="col" v-for="peli in paginatedMovies" :key="peli.id">
          <CardProducte :movie="peli" />
        </div>
      </div>

      <!-- Paginación -->
      <nav v-if="totalPages > 1" class="mt-5 d-flex justify-content-center" aria-label="Paginación">
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

<style scoped>
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  padding: 14px 20px;
  background: var(--page-card-bg);
  border: 1px solid var(--page-border);
  border-radius: 12px 12px 0 0;
  border-bottom: none;
}

.search-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 12px 20px;
  background: var(--page-card-bg);
  border: 1px solid var(--page-border);
  border-radius: 0 0 12px 12px;
}

.search-wrap {
  position: relative;
  flex: 1;
  min-width: 200px;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  font-size: 0.85rem;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 6px 36px 6px 36px;
  border-radius: 20px;
  border: 1px solid var(--page-border);
  background: var(--page-bg);
  color: var(--page-text);
  font-size: 0.85rem;
  outline: none;
  transition: border-color 0.2s;
}
.search-input:focus { border-color: var(--accent); }
.search-input::placeholder { color: var(--page-muted); }

.search-clear {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: var(--page-muted);
  font-size: 0.75rem;
  cursor: pointer;
  padding: 2px 4px;
}
.search-clear:hover { color: var(--page-text); }

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-label {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--page-muted);
  white-space: nowrap;
}

.filter-pills {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.filter-pill {
  padding: 5px 14px;
  border-radius: 20px;
  border: 1px solid var(--page-border);
  background: transparent;
  color: var(--page-muted);
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.filter-pill:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.filter-pill--active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
  font-weight: 600;
}

.filter-select {
  padding: 5px 32px 5px 12px;
  border-radius: 20px;
  border: 1px solid var(--page-border);
  background: transparent;
  color: var(--page-text);
  font-size: 0.82rem;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23888'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
}

.filter-select:focus { outline: none; border-color: var(--accent); }

.filter-clear {
  background: none;
  border: 1px solid var(--page-border);
  color: var(--page-muted);
  font-size: 0.8rem;
  padding: 4px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}
.filter-clear:hover { border-color: #e53935; color: #e53935; }

.filter-count {
  font-size: 0.82rem;
  color: var(--page-muted);
  white-space: nowrap;
}
</style>
