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
  // Cuando conectemos con Laravel, aquí irá la llamada a la API
  const newMovie = {
    id: movieStore.peliculas.length + 1,
    title: title.value,
    duracion: duracion.value,
    desc: desc.value,
    folder: '',
    likes: 0,
    comments: [],
  };
  movieStore.peliculas.push(newMovie);
  submitted.value = true;
};

const reset = () => {
  title.value = '';
  duracion.value = '';
  desc.value = '';
  price.value = '';
  submitted.value = false;
};
</script>

<template>
  <section class="vender-section">
    <div class="film-container">
      <div class="film-edge left"></div>

      <div class="form-content">
        <h1>Vender una película</h1>
        <p class="subtitle">Añade tu película al catálogo de Lost Tapes</p>

        <div v-if="submitted" class="success-msg">
          <p>¡Película añadida correctamente!</p>
          <button class="submit-btn" @click="reset">Añadir otra</button>
        </div>

        <form v-else @submit.prevent="handleSubmit" class="styled-form">
          <div class="form-group">
            <label for="title">Título</label>
            <input v-model="title" type="text" id="title" placeholder="Título de la película" required />
          </div>

          <div class="form-group">
            <label for="duracion">Duración</label>
            <input v-model="duracion" type="text" id="duracion" placeholder="ej: 127'" required />
          </div>

          <div class="form-group">
            <label for="price">Precio (€)</label>
            <input v-model="price" type="number" id="price" placeholder="ej: 12.99" min="0" step="0.01" required />
          </div>

          <div class="form-group">
            <label for="desc">Descripción</label>
            <textarea v-model="desc" id="desc" rows="4" placeholder="Descripción breve de la película" required></textarea>
          </div>

          <div class="form-group">
            <label>Imagen de portada</label>
            <div class="file-drop">
              <p>Subida de imágenes disponible al conectar con el servidor</p>
            </div>
          </div>

          <p class="seller-info" v-if="user">Vendiendo como: <strong>{{ user.name }}</strong></p>

          <button type="submit" class="submit-btn">Publicar película</button>
        </form>
      </div>

      <div class="film-edge right"></div>
    </div>
  </section>
</template>

<style scoped>
.vender-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 60px 20px;
}

.film-container {
  display: flex;
  background-color: #111;
  border: 1px solid #333;
  max-width: 560px;
  width: 100%;
}

.film-edge {
  width: 40px;
  background-color: #111;
  position: relative;
  flex-shrink: 0;
}

.film-edge::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 22px;
  height: 100%;
  background-image: linear-gradient(to bottom, #eee 20px, transparent 20px);
  background-size: 100% 40px;
}

.form-content {
  flex: 1;
  padding: 40px 30px;
  color: white;
}

h1 {
  font-size: 2rem;
  margin-bottom: 8px;
}

.subtitle {
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 0.9rem;
}

input, textarea {
  width: 100%;
  padding: 12px;
  background-color: #000;
  border: 1px solid #444;
  color: white;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: inherit;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #ff6600;
}

.file-drop {
  border: 2px dashed #444;
  border-radius: 4px;
  padding: 24px;
  text-align: center;
  color: #666;
  font-size: 0.85rem;
}

.seller-info {
  color: #888;
  font-size: 0.85rem;
  margin-bottom: 10px;
}

.seller-info strong {
  color: #ff6600;
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background-color: #fff;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  text-transform: uppercase;
  border: none;
  margin-top: 10px;
  transition: background 0.2s;
}

.submit-btn:hover {
  background-color: #ff6600;
  color: white;
}

.success-msg {
  text-align: center;
  padding: 40px 0;
}

.success-msg p {
  font-size: 1.2rem;
  color: #4caf50;
  margin-bottom: 24px;
}
</style>
