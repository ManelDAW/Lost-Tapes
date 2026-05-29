<script setup>
import { ref, computed } from 'vue';
import { useMovieStore } from '@/stores/movieStore';

const movieStore = useMovieStore();
const user = computed(() => movieStore.user);

const title = ref('');
const duracion = ref('');
const desc = ref('');
const price = ref('');
const submitted = ref(false);

const handleSubmit = () => {
  movieStore.peliculas.push({
    id: movieStore.peliculas.length + 1,
    title: title.value,
    duracion: duracion.value,
    desc: desc.value,
    folder: '',
    likes: 0,
    comments: [],
  });
  submitted.value = true;
};

const reset = () => {
  title.value = ''; duracion.value = ''; desc.value = ''; price.value = '';
  submitted.value = false;
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center py-5" style="min-height:100vh;">
    <div class="film-wrap" style="max-width:560px;">
      <div class="film-edge"></div>
      <div class="film-content">
        <h1 class="fw-bold mb-1" style="font-size:2rem;">Vender una película</h1>
        <p class="mb-4" style="color:#aaa; font-size:0.9rem;">Añade tu película al catálogo de Lost Tapes</p>

        <div v-if="submitted" class="text-center py-4">
          <p class="text-success fs-5 mb-4">¡Película añadida correctamente!</p>
          <button class="btn btn-light fw-bold text-uppercase w-100" @click="reset">Añadir otra</button>
        </div>

        <form v-else @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label class="form-label fw-bold text-white">Título</label>
            <input v-model="title" type="text" placeholder="Título de la película"
                   class="form-control" style="background:#000; border-color:#444; color:white;" required />
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold text-white">Duración</label>
            <input v-model="duracion" type="text" placeholder="ej: 127'"
                   class="form-control" style="background:#000; border-color:#444; color:white;" required />
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold text-white">Precio (€)</label>
            <input v-model="price" type="number" placeholder="ej: 12.99" min="0" step="0.01"
                   class="form-control" style="background:#000; border-color:#444; color:white;" required />
          </div>
          <div class="mb-3">
            <label class="form-label fw-bold text-white">Descripción</label>
            <textarea v-model="desc" rows="4" placeholder="Descripción breve de la película"
                      class="form-control" style="background:#000; border-color:#444; color:white;" required></textarea>
          </div>
          <div class="mb-3 p-3 text-center rounded" style="border:2px dashed #444; color:#666; font-size:0.85rem;">
            Subida de imágenes disponible al conectar con el servidor
          </div>

          <p v-if="user" class="mb-3" style="color:#888; font-size:0.85rem;">
            Vendiendo como: <strong style="color:#ff6600;">{{ user.name }}</strong>
          </p>

          <button type="submit" class="btn btn-light w-100 fw-bold text-uppercase">Publicar película</button>
        </form>
      </div>
      <div class="film-edge"></div>
    </div>
  </div>
</template>
