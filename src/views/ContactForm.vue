<script setup>
import { useForm, useField } from 'vee-validate';
import { object, string } from 'yup';
import { ref } from 'vue';

const submitted = ref(false);

const schema = object({
  nombre: string().required('El nombre es obligatorio').min(2, 'Mínimo 2 caracteres'),
  email: string().required('El correo es obligatorio').email('Introduce un correo válido'),
  asunto: string().required('El asunto es obligatorio'),
  mensaje: string().required('El mensaje es obligatorio').min(10, 'Mínimo 10 caracteres'),
});

const { handleSubmit, resetForm } = useForm({ validationSchema: schema });
const { value: nombre, errorMessage: nombreError } = useField('nombre');
const { value: email, errorMessage: emailError } = useField('email');
const { value: asunto, errorMessage: asuntoError } = useField('asunto');
const { value: mensaje, errorMessage: mensajeError } = useField('mensaje');

const onSubmit = handleSubmit(() => {
  submitted.value = true;
});

const reset = () => {
  resetForm();
  submitted.value = false;
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center py-5" style="min-height:100vh;">
    <div class="film-wrap" style="max-width:600px;">
      <div class="film-edge"></div>
      <div class="film-content">
        <h1 class="fw-bold text-center mb-1" style="font-size:clamp(1.4rem, 4vw, 2rem);">Contáctanos</h1>
        <p class="text-center mb-4" style="color:#aaa; font-size:0.9rem;">
          Envíanos un mensaje y te responderemos lo antes posible.
        </p>

        <div v-if="submitted" class="text-center py-4">
          <p class="text-success fs-5 mb-4">¡Mensaje enviado correctamente!</p>
          <button class="btn btn-light fw-bold text-uppercase w-100" @click="reset">Enviar otro</button>
        </div>

        <form v-else @submit.prevent="onSubmit" novalidate>
          <div class="mb-3">
            <label for="nombre" class="form-label fw-bold text-white">Nombre completo</label>
            <input v-model="nombre" type="text" id="nombre" placeholder="Tu nombre"
                   class="form-control" :class="{ 'is-invalid': nombreError }"
                   style="background:#000; border-color:#444; color:white;" />
            <div v-if="nombreError" class="invalid-feedback">{{ nombreError }}</div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label fw-bold text-white">Correo electrónico</label>
            <input v-model="email" type="email" id="email" placeholder="tu@correo.com"
                   class="form-control" :class="{ 'is-invalid': emailError }"
                   style="background:#000; border-color:#444; color:white;" />
            <div v-if="emailError" class="invalid-feedback">{{ emailError }}</div>
          </div>
          <div class="mb-3">
            <label for="asunto" class="form-label fw-bold text-white">Asunto</label>
            <input v-model="asunto" type="text" id="asunto" placeholder="Motivo del mensaje"
                   class="form-control" :class="{ 'is-invalid': asuntoError }"
                   style="background:#000; border-color:#444; color:white;" />
            <div v-if="asuntoError" class="invalid-feedback">{{ asuntoError }}</div>
          </div>
          <div class="mb-3">
            <label for="mensaje" class="form-label fw-bold text-white">Mensaje</label>
            <textarea v-model="mensaje" id="mensaje" rows="4" placeholder="Escribe tu mensaje aquí..."
                      class="form-control" :class="{ 'is-invalid': mensajeError }"
                      style="background:#000; border-color:#444; color:white;"></textarea>
            <div v-if="mensajeError" class="invalid-feedback">{{ mensajeError }}</div>
          </div>
          <button type="submit" class="btn btn-light w-100 fw-bold text-uppercase">Enviar Mensaje</button>
        </form>
      </div>
      <div class="film-edge"></div>
    </div>
  </div>
</template>
