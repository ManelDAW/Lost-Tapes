<script setup>
import { useForm, useField } from 'vee-validate';
import { object, string, number } from 'yup';
import { useMovieStore } from '@/stores/movieStore';
import { computed, ref } from 'vue';

const movieStore = useMovieStore();
const user = computed(() => movieStore.user);
const submitted = ref(false);

const schema = object({
  title: string().required('El título es obligatorio'),
  duracion: string().required('La duración es obligatoria'),
  price: number().typeError('Introduce un número válido').required('El precio es obligatorio').min(0, 'El precio no puede ser negativo'),
  desc: string().required('La descripción es obligatoria').min(10, 'Mínimo 10 caracteres'),
});

const { handleSubmit, resetForm } = useForm({ validationSchema: schema });
const { value: title, errorMessage: titleError } = useField('title');
const { value: duracion, errorMessage: duracionError } = useField('duracion');
const { value: price, errorMessage: priceError } = useField('price');
const { value: desc, errorMessage: descError } = useField('desc');

const onSubmit = handleSubmit((values) => {
  movieStore.peliculas.push({
    id: movieStore.peliculas.length + 1,
    title: values.title,
    duracion: values.duracion,
    desc: values.desc,
    price: values.price,
    folder: null,
    likes: 0,
    comments: [],
  });
  submitted.value = true;
});

const reset = () => {
  resetForm();
  submitted.value = false;
};
</script>

<template>
  <div class="vender-page">

    <!-- Columna izquierda: contexto -->
    <div class="vender-left">
      <span class="vender-tag">Vendedor</span>
      <h1 class="vender-title">Publica<br/>tu película</h1>
      <div class="vender-rule"></div>

      <p class="vender-desc">
        ¿Tienes una joya del cine olvidado? Añádela al catálogo de Lost Tapes
        y ponla al alcance de los amantes del cine de culto.
      </p>

      <div class="vender-bullets">
        <div class="bullet">
          <span class="bullet-num">01</span>
          <span class="bullet-text">Rellena los datos de la película</span>
        </div>
        <div class="bullet">
          <span class="bullet-num">02</span>
          <span class="bullet-text">El equipo revisa y aprueba el listado</span>
        </div>
        <div class="bullet">
          <span class="bullet-num">03</span>
          <span class="bullet-text">Aparece en el catálogo público</span>
        </div>
      </div>

      <div v-if="user" class="vender-user">
        <span class="vender-user__label">Publicando como</span>
        <span class="vender-user__name">{{ user.name }}</span>
      </div>
    </div>

    <!-- Columna derecha: formulario -->
    <div class="vender-right">
      <div class="vender-form-wrap">

        <div v-if="submitted" class="text-center py-5">
          <div class="success-icon">✓</div>
          <p class="success-msg">¡Película añadida al catálogo!</p>
          <button class="btn-send w-full" @click="reset">Publicar otra</button>
        </div>

        <form v-else @submit.prevent="onSubmit" novalidate>
          <div class="field">
            <label for="title">Título</label>
            <input id="title" v-model="title" type="text" placeholder="Título de la película"
                   :class="{ 'error': titleError }" />
            <span v-if="titleError" class="field-error">{{ titleError }}</span>
          </div>

          <div class="field">
            <label for="duracion">Duración</label>
            <input id="duracion" v-model="duracion" type="text" placeholder="ej: 127'"
                   :class="{ 'error': duracionError }" />
            <span v-if="duracionError" class="field-error">{{ duracionError }}</span>
          </div>

          <div class="field">
            <label for="price">Precio (€)</label>
            <input id="price" v-model="price" type="number" placeholder="ej: 12.99" min="0" step="0.01"
                   :class="{ 'error': priceError }" />
            <span v-if="priceError" class="field-error">{{ priceError }}</span>
          </div>

          <div class="field">
            <label for="desc">Descripción</label>
            <textarea id="desc" v-model="desc" rows="4" placeholder="Descripción breve de la película"
                      :class="{ 'error': descError }"></textarea>
            <span v-if="descError" class="field-error">{{ descError }}</span>
          </div>

          <div class="upload-placeholder">
            <span class="upload-icon">+</span>
            <span>Imagen de portada · Disponible próximamente</span>
          </div>

          <button type="submit" class="btn-send">Publicar película</button>
        </form>
      </div>
    </div>

  </div>
</template>

<style scoped>
.vender-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #0d0d0d;
}

@media (max-width: 768px) {
  .vender-page { grid-template-columns: 1fr; }
}

/* ── Columna izquierda ─── */
.vender-left {
  padding: 80px 40px 80px 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid #1e1e1e;
}

@media (max-width: 768px) {
  .vender-left { padding: 56px 24px 32px; border-right: none; border-bottom: 1px solid #1e1e1e; }
}

.vender-tag {
  font-size: 10px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #c0392b;
  font-weight: 600;
  margin-bottom: 16px;
  display: block;
}

.vender-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(36px, 5vw, 60px);
  font-weight: 900;
  color: #fff;
  line-height: 1.05;
  margin: 0 0 20px;
}

.vender-rule {
  width: 40px;
  height: 2px;
  background: #c0392b;
  margin-bottom: 24px;
}

.vender-desc {
  color: #666;
  font-size: 15px;
  line-height: 1.8;
  margin-bottom: 40px;
}

.vender-bullets {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
}

.bullet {
  display: flex;
  align-items: center;
  gap: 16px;
}

.bullet-num {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 22px;
  font-weight: 900;
  color: #c0392b;
  opacity: 0.5;
  line-height: 1;
  flex-shrink: 0;
  width: 32px;
}

.bullet-text {
  font-size: 14px;
  color: #888;
  line-height: 1.4;
}

.vender-user {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 14px 0 0;
  border-top: 1px solid #1e1e1e;
}

.vender-user__label {
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #444;
}

.vender-user__name {
  font-size: 15px;
  color: #c0392b;
  font-weight: 600;
}

/* ── Columna derecha ─── */
.vender-right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 56px 40px;
  background: #080808;
}

@media (max-width: 768px) {
  .vender-right { padding: 40px 20px 64px; }
}

.vender-form-wrap {
  width: 100%;
  max-width: 480px;
}

/* Campos */
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 20px;
}

.field label {
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #666;
  font-weight: 600;
}

.field input, .field textarea {
  background: #000;
  border: 1px solid #333;
  border-radius: 4px;
  padding: 10px 14px;
  color: #fff;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  resize: vertical;
}

.field input:focus, .field textarea:focus { border-color: #c0392b; }
.field input::placeholder, .field textarea::placeholder { color: #444; }
.field input.error, .field textarea.error { border-color: #c0392b; }

.field-error {
  font-size: 12px;
  color: #e74c3c;
}

/* Upload placeholder */
.upload-placeholder {
  border: 1px dashed #2a2a2a;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  color: #444;
  font-size: 13px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.upload-icon {
  font-size: 24px;
  color: #2a2a2a;
}

/* Botón */
.btn-send {
  width: 100%;
  background: #c0392b;
  color: #fff;
  border: none;
  padding: 13px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  border-radius: 3px;
  cursor: pointer;
  transition: background 0.2s;
  display: block;
}
.btn-send:hover { background: #a93226; }

/* Éxito */
.success-icon {
  width: 56px;
  height: 56px;
  background: #c0392b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  margin: 0 auto 16px;
}

.success-msg {
  color: #aaa;
  font-size: 15px;
  margin-bottom: 24px;
}

.w-full { width: 100%; }
</style>
