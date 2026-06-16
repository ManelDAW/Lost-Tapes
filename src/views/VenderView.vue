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
  <div class="d-flex justify-content-center align-items-center py-5" style="min-height:100vh;">
    <div class="film-wrap" style="max-width:560px;">
      <div class="film-edge"></div>
      <div class="film-content">
        <h1 class="fw-bold mb-1" style="font-size:clamp(1.4rem, 4vw, 2rem);">Vender una película</h1>
        <p class="mb-4" style="color:#aaa; font-size:0.9rem;">Añade tu película al catálogo de Lost Tapes</p>

        <div v-if="submitted" class="text-center py-4">
          <p class="text-success fs-5 mb-4">¡Película añadida correctamente!</p>
          <button class="btn btn-light fw-bold text-uppercase w-100" @click="reset">Añadir otra</button>
        </div>

        <form v-else @submit.prevent="onSubmit" novalidate>
          <div class="mb-3">
            <label for="title" class="form-label fw-bold text-white">Título</label>
            <input id="title" v-model="title" type="text" placeholder="Título de la película"
                   class="form-control" :class="{ 'is-invalid': titleError }"
                   :aria-describedby="titleError ? 'title-error' : null"
                   style="background:#000; border-color:#444; color:white;" />
            <div v-if="titleError" id="title-error" class="invalid-feedback">{{ titleError }}</div>
          </div>
          <div class="mb-3">
            <label for="duracion" class="form-label fw-bold text-white">Duración</label>
            <input id="duracion" v-model="duracion" type="text" placeholder="ej: 127'"
                   class="form-control" :class="{ 'is-invalid': duracionError }"
                   :aria-describedby="duracionError ? 'duracion-error' : null"
                   style="background:#000; border-color:#444; color:white;" />
            <div v-if="duracionError" id="duracion-error" class="invalid-feedback">{{ duracionError }}</div>
          </div>
          <div class="mb-3">
            <label for="price" class="form-label fw-bold text-white">Precio (€)</label>
            <input id="price" v-model="price" type="number" placeholder="ej: 12.99" min="0" step="0.01"
                   class="form-control" :class="{ 'is-invalid': priceError }"
                   :aria-describedby="priceError ? 'price-error' : null"
                   style="background:#000; border-color:#444; color:white;" />
            <div v-if="priceError" id="price-error" class="invalid-feedback">{{ priceError }}</div>
          </div>
          <div class="mb-3">
            <label for="desc" class="form-label fw-bold text-white">Descripción</label>
            <textarea id="desc" v-model="desc" rows="4" placeholder="Descripción breve de la película"
                      class="form-control" :class="{ 'is-invalid': descError }"
                      :aria-describedby="descError ? 'desc-error' : null"
                      style="background:#000; border-color:#444; color:white;"></textarea>
            <div v-if="descError" id="desc-error" class="invalid-feedback">{{ descError }}</div>
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
