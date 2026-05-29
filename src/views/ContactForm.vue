<script setup>
import { ref } from 'vue';

const nombre = ref('');
const email = ref('');
const asunto = ref('');
const mensaje = ref('');
const checkboxValidar = ref(false);

const handleSubmit = () => {
  if (checkboxValidar.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (nombre.value.trim() === '') { alert('¡Error de JS!: Por favor, ingresa tu nombre completo.'); return; }
    if (!emailRegex.test(email.value.trim())) { alert('¡Error de JS!: Por favor, ingresa un correo electrónico válido.'); return; }
    if (asunto.value.trim() === '') { alert('¡Error de JS!: Por favor, ingresa el asunto.'); return; }
    if (mensaje.value.trim() === '') { alert('¡Error de JS!: Por favor, escribe tu mensaje.'); return; }
    alert('Validación de JavaScript superada con éxito.');
  }
  console.log("Formulario procesado correctamente.");
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center py-5" style="min-height:100vh;">
    <div class="film-wrap" style="max-width:600px;">
      <div class="film-edge"></div>
      <div class="film-content">
        <h1 class="fw-bold text-center mb-1" style="font-size:2rem;">Contáctanos</h1>
        <p class="text-center mb-4" style="color:#aaa; font-size:0.9rem;">
          Envíanos un mensaje y te responderemos lo antes posible.
        </p>

        <form @submit.prevent="handleSubmit" :novalidate="checkboxValidar">
          <div class="mb-3">
            <label for="nombre" class="form-label fw-bold text-white">Nombre completo</label>
            <input v-model="nombre" type="text" id="nombre" placeholder="Tu nombre"
                   class="form-control" style="background:#000; border-color:#444; color:white;" required />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label fw-bold text-white">Correo electrónico</label>
            <input v-model="email" type="email" id="email" placeholder="tu@correo.com"
                   class="form-control" style="background:#000; border-color:#444; color:white;" required />
          </div>
          <div class="mb-3">
            <label for="asunto" class="form-label fw-bold text-white">Asunto</label>
            <input v-model="asunto" type="text" id="asunto" placeholder="Motivo del mensaje"
                   class="form-control" style="background:#000; border-color:#444; color:white;" required />
          </div>
          <div class="mb-3">
            <label for="mensaje" class="form-label fw-bold text-white">Mensaje</label>
            <textarea v-model="mensaje" id="mensaje" rows="4" placeholder="Escribe tu mensaje aquí..."
                      class="form-control" style="background:#000; border-color:#444; color:white;" required></textarea>
          </div>
          <div class="form-check mb-3">
            <input type="checkbox" id="btn-validar" v-model="checkboxValidar" class="form-check-input" />
            <label for="btn-validar" class="form-check-label text-white">Validar con JS</label>
          </div>
          <button type="submit" class="btn btn-light w-100 fw-bold text-uppercase">Enviar Mensaje</button>
        </form>
      </div>
      <div class="film-edge"></div>
    </div>
  </div>
</template>
