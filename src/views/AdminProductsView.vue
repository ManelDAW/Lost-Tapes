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
  <section class="admin-section">
    <div class="admin-header">
      <h1>Gestión de productos</h1>
      <button class="btn-new" @click="openCreate">+ Añadir película</button>
    </div>

    <div class="table-wrapper">
      <table class="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Duración</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in movieStore.peliculas" :key="movie.id">
            <td>{{ movie.id }}</td>
            <td>{{ movie.title }}</td>
            <td>{{ movie.duracion }}</td>
            <td class="desc-cell">{{ movie.desc }}</td>
            <td class="actions-cell">
              <button class="btn-edit" @click="openEdit(movie)">Editar</button>
              <button class="btn-delete" @click="deleteProduct(movie.id)">Borrar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de creación / edición -->
    <div v-if="showForm" class="modal-overlay" @click.self="showForm = false">
      <div class="modal">
        <h2>{{ editingProduct ? 'Editar película' : 'Nueva película' }}</h2>

        <div class="form-group">
          <label>Título</label>
          <input v-model="form.title" type="text" placeholder="Título de la película" />
        </div>
        <div class="form-group">
          <label>Duración</label>
          <input v-model="form.duracion" type="text" placeholder="ej: 127'" />
        </div>
        <div class="form-group">
          <label>Descripción</label>
          <textarea v-model="form.desc" rows="3" placeholder="Descripción breve"></textarea>
        </div>
        <div class="form-group">
          <label>Carpeta de imágenes</label>
          <input v-model="form.folder" type="text" placeholder="ej: harakiri" />
        </div>

        <div class="modal-actions">
          <button class="btn-save" @click="saveProduct">Guardar</button>
          <button class="btn-cancel" @click="showForm = false">Cancelar</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.admin-section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
  color: white;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

h1 {
  font-size: 1.8rem;
}

.btn-new {
  background: #ff6600;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.95rem;
}

.table-wrapper {
  overflow-x: auto;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
  background: #111;
  border-radius: 8px;
  overflow: hidden;
}

.products-table th {
  background: #1a1a1a;
  padding: 14px 16px;
  text-align: left;
  font-size: 0.85rem;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.products-table td {
  padding: 14px 16px;
  border-bottom: 1px solid #222;
  font-size: 0.9rem;
}

.products-table tr:last-child td {
  border-bottom: none;
}

.products-table tr:hover td {
  background: #1a1a1a;
}

.desc-cell {
  max-width: 300px;
  color: #aaa;
}

.actions-cell {
  display: flex;
  gap: 8px;
}

.btn-edit {
  background: #333;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}

.btn-edit:hover { background: #444; }

.btn-delete {
  background: #5c1a1a;
  color: #ff6666;
  border: none;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}

.btn-delete:hover { background: #7a2020; }

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.modal {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 30px;
  width: 100%;
  max-width: 480px;
  color: white;
}

.modal h2 {
  margin: 0 0 24px 0;
  font-size: 1.3rem;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  color: #888;
  font-size: 0.85rem;
  margin-bottom: 6px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  background: #000;
  border: 1px solid #444;
  color: white;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #ff6600;
}

.modal-actions {
  display: flex;
  gap: 10px;
  margin-top: 24px;
}

.btn-save {
  flex: 1;
  padding: 12px;
  background: #ff6600;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancel {
  flex: 1;
  padding: 12px;
  background: #333;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
