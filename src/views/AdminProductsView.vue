<script setup>
import { ref } from 'vue';
import { useMovieStore } from '@/stores/movieStore';

const movieStore = useMovieStore();
const showForm = ref(false);
const editingProduct = ref(null);
const form = ref({ title: '', duracion: '', desc: '', folder: '' });

const openCreate = () => {
  editingProduct.value = null;
  form.value = { title: '', duracion: '', desc: '', folder: '' };
  showForm.value = true;
};

const openEdit = (movie) => {
  editingProduct.value = movie;
  form.value = { ...movie };
  showForm.value = true;
};

const saveProduct = () => {
  if (editingProduct.value) {
    const index = movieStore.peliculas.findIndex(p => p.id === editingProduct.value.id);
    if (index !== -1) movieStore.peliculas[index] = { ...editingProduct.value, ...form.value };
  } else {
    const newId = movieStore.peliculas.length + 1;
    movieStore.peliculas.push({ id: newId, likes: 0, comments: [], ...form.value });
  }
  showForm.value = false;
};

const deleteProduct = (id) => {
  if (confirm('¿Seguro que quieres eliminar esta película?')) {
    movieStore.peliculas = movieStore.peliculas.filter(p => p.id !== id);
  }
};
</script>

<template>
  <div class="container-xl py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="fw-bold mb-0" style="font-size:1.8rem; color: var(--page-text);">Gestión de productos</h1>
      <button class="btn btn-accent fw-bold" @click="openCreate">+ Añadir película</button>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered table-hover align-middle"
             style="background: var(--page-card-bg); color: var(--page-text);">
        <thead style="background: var(--page-card-bg);">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th class="d-none d-md-table-cell">Duración</th>
            <th class="d-none d-lg-table-cell">Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in movieStore.peliculas" :key="movie.id">
            <td>{{ movie.id }}</td>
            <td>{{ movie.title }}</td>
            <td class="d-none d-md-table-cell">{{ movie.duracion }}</td>
            <td class="d-none d-lg-table-cell" style="max-width:300px; color: var(--page-muted);">
              <span class="text-truncate d-block" style="max-width:280px;">{{ movie.desc }}</span>
            </td>
            <td>
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-warning" @click="openEdit(movie)">Editar</button>
                <button class="btn btn-sm btn-danger" @click="deleteProduct(movie.id)">Borrar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Bootstrap -->
    <div v-if="showForm" class="modal d-block" tabindex="-1" style="background:rgba(0,0,0,0.7);"
         @click.self="showForm = false">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="background: var(--page-card-bg); color: var(--page-text); border-color: var(--page-border);">
          <div class="modal-header" style="border-color: var(--page-border);">
            <h5 class="modal-title fw-bold">{{ editingProduct ? 'Editar película' : 'Nueva película' }}</h5>
            <button type="button" class="btn-close btn-close-modal" @click="showForm = false"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label fw-bold">Título</label>
              <input v-model="form.title" type="text" placeholder="Título de la película"
                     class="form-control" style="background: var(--page-input-bg); border-color: var(--page-border); color: var(--page-text);" />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold">Duración</label>
              <input v-model="form.duracion" type="text" placeholder="ej: 127'"
                     class="form-control" style="background: var(--page-input-bg); border-color: var(--page-border); color: var(--page-text);" />
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold">Descripción</label>
              <textarea v-model="form.desc" rows="3" placeholder="Descripción breve"
                        class="form-control" style="background: var(--page-input-bg); border-color: var(--page-border); color: var(--page-text);"></textarea>
            </div>
            <div class="mb-3">
              <label class="form-label fw-bold">Carpeta de imágenes</label>
              <input v-model="form.folder" type="text" placeholder="ej: harakiri"
                     class="form-control" style="background: var(--page-input-bg); border-color: var(--page-border); color: var(--page-text);" />
            </div>
          </div>
          <div class="modal-footer d-flex gap-2" style="border-color: var(--page-border);">
            <button class="btn btn-accent flex-fill fw-bold" @click="saveProduct">Guardar</button>
            <button class="btn btn-secondary flex-fill fw-bold" @click="showForm = false">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
