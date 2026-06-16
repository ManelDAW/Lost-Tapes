<script setup>
import { ref } from 'vue';
import { useMovieStore } from '@/stores/movieStore';
import { updateMovie, createMovie, deleteMovie } from '@/services/api';

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
  form.value = { title: movie.title, duracion: movie.duracion, desc: movie.desc, folder: movie.folder };
  showForm.value = true;
};

const saveProduct = async () => {
  const payload = {
    name: form.value.title,
    duration: form.value.duracion,
    description: form.value.desc,
    folder: form.value.folder,
  };

  if (editingProduct.value) {
    const { data } = await updateMovie(editingProduct.value.id, payload);
    const product = data.data ?? data;
    const index = movieStore.peliculas.findIndex(p => p.id === editingProduct.value.id);
    if (index !== -1) {
      movieStore.peliculas[index] = {
        ...movieStore.peliculas[index],
        title: product.name,
        duracion: product.duration,
        desc: product.description,
        folder: product.folder,
      };
    }
  } else {
    const { data } = await createMovie({ ...payload, sku: `SKU-${Date.now()}`, price: 0, stock: 0 });
    const product = data.data ?? data;
    movieStore.peliculas.push({
      id: product.id,
      title: product.name,
      duracion: product.duration,
      desc: product.description,
      folder: product.folder,
      likes: 0,
      comments: [],
    });
  }
  showForm.value = false;
};

const deleteProduct = async (id) => {
  if (confirm('¿Seguro que quieres eliminar esta película?')) {
    await deleteMovie(id);
    movieStore.peliculas = movieStore.peliculas.filter(p => p.id !== id);
  }
};
</script>

<template>
  <div class="admin-page">

    <!-- Header -->
    <div class="admin-header">
      <div class="admin-header__text">
        <span class="admin-tag">Admin</span>
        <h1 class="admin-title">Gestión de películas</h1>
      </div>
      <button class="btn-add" @click="openCreate">+ Añadir película</button>
    </div>

    <!-- Stats bar -->
    <div class="admin-stats">
      <div class="stat-item">
        <span class="stat-value">{{ movieStore.peliculas.length }}</span>
        <span class="stat-label">Películas en catálogo</span>
      </div>
    </div>

    <!-- Tabla -->
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>
            <th class="col-id">ID</th>
            <th>Título</th>
            <th class="col-md">Duración</th>
            <th class="col-lg">Descripción</th>
            <th class="col-actions">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in movieStore.peliculas" :key="movie.id">
            <td class="col-id cell-id">{{ movie.id }}</td>
            <td class="cell-title">{{ movie.title }}</td>
            <td class="col-md cell-muted">{{ movie.duracion }}</td>
            <td class="col-lg cell-muted cell-truncate">{{ movie.desc }}</td>
            <td class="col-actions">
              <div class="action-btns">
                <button class="btn-edit" @click="openEdit(movie)">Editar</button>
                <button class="btn-delete" @click="deleteProduct(movie.id)">Borrar</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showForm" class="modal-overlay" @click.self="showForm = false">
      <div class="modal-box">
        <div class="modal-head">
          <h5 class="modal-heading">{{ editingProduct ? 'Editar película' : 'Nueva película' }}</h5>
          <button class="modal-close" @click="showForm = false">✕</button>
        </div>
        <div class="modal-body">
          <div class="field">
            <label>Título</label>
            <input v-model="form.title" type="text" placeholder="Título de la película" />
          </div>
          <div class="field">
            <label>Duración</label>
            <input v-model="form.duracion" type="text" placeholder="ej: 127'" />
          </div>
          <div class="field">
            <label>Descripción</label>
            <textarea v-model="form.desc" rows="3" placeholder="Descripción breve"></textarea>
          </div>
          <div class="field">
            <label>Carpeta de imágenes</label>
            <input v-model="form.folder" type="text" placeholder="ej: harakiri" />
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn-save" @click="saveProduct">Guardar</button>
          <button class="btn-cancel" @click="showForm = false">Cancelar</button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.admin-page {
  max-width: 1320px;
  margin: 0 auto;
  padding: 48px 24px 80px;
}

/* Header */
.admin-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.admin-tag {
  display: block;
  font-size: 10px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #c0392b;
  font-weight: 600;
  margin-bottom: 8px;
}

.admin-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 900;
  color: var(--page-text);
  margin: 0;
  line-height: 1.1;
}

.btn-add {
  background: #c0392b;
  color: #fff;
  border: none;
  padding: 10px 22px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}
.btn-add:hover { background: #a93226; }

/* Stats */
.admin-stats {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-value {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 28px;
  font-weight: 700;
  color: var(--page-text);
  line-height: 1;
}

.stat-label {
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #555;
}

/* Tabla */
.admin-table-wrap {
  border: 1px solid var(--page-border);
  border-radius: 6px;
  overflow: hidden;
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.admin-table thead tr {
  background: #111;
  border-bottom: 1px solid #2a2a2a;
}

.admin-table th {
  padding: 12px 16px;
  text-align: left;
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #555;
  font-weight: 600;
  white-space: nowrap;
}

.admin-table tbody tr {
  border-bottom: 1px solid #1a1a1a;
  transition: background 0.15s;
}

.admin-table tbody tr:last-child { border-bottom: none; }
.admin-table tbody tr:hover { background: #111; }

.admin-table td {
  padding: 14px 16px;
  vertical-align: middle;
}

.col-id { width: 56px; }
.col-md { display: none; }
.col-lg { display: none; }
.col-actions { width: 140px; }

@media (min-width: 640px) { .col-md { display: table-cell; } }
@media (min-width: 1024px) { .col-lg { display: table-cell; } }

.cell-id { color: #444; font-size: 12px; }
.cell-title { color: var(--page-text); font-weight: 500; }
.cell-muted { color: #666; }
.cell-truncate {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Botones de acción */
.action-btns { display: flex; gap: 8px; }

.btn-edit, .btn-delete {
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid;
  transition: all 0.15s;
}

.btn-edit {
  background: transparent;
  border-color: #444;
  color: #aaa;
}
.btn-edit:hover { border-color: #c0392b; color: #c0392b; }

.btn-delete {
  background: transparent;
  border-color: #3a1a1a;
  color: #7a3030;
}
.btn-delete:hover { background: #c0392b; border-color: #c0392b; color: #fff; }

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.modal-box {
  background: #111;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
}

.modal-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid #1e1e1e;
}

.modal-heading {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--page-text);
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  color: #555;
  font-size: 16px;
  cursor: pointer;
  padding: 4px 8px;
  transition: color 0.15s;
}
.modal-close:hover { color: #fff; }

.modal-body { padding: 24px; display: flex; flex-direction: column; gap: 16px; }

.field { display: flex; flex-direction: column; gap: 6px; }

.field label {
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #666;
  font-weight: 600;
}

.field input, .field textarea {
  background: #0a0a0a;
  border: 1px solid #2a2a2a;
  border-radius: 4px;
  padding: 9px 12px;
  color: var(--page-text);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  resize: vertical;
}

.field input:focus, .field textarea:focus { border-color: #c0392b; }
.field input::placeholder, .field textarea::placeholder { color: #444; }

.modal-foot {
  display: flex;
  gap: 10px;
  padding: 16px 24px 20px;
  border-top: 1px solid #1e1e1e;
}

.btn-save {
  flex: 1;
  background: #c0392b;
  color: #fff;
  border: none;
  padding: 10px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-save:hover { background: #a93226; }

.btn-cancel {
  flex: 1;
  background: transparent;
  color: #777;
  border: 1px solid #2a2a2a;
  padding: 10px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-cancel:hover { border-color: #444; color: #aaa; }
</style>
