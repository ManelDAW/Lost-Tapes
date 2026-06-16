<script setup>
import { useForm, useField } from 'vee-validate';
import { object, string } from 'yup';
import { ref } from 'vue';

const submitted = ref(false);

const schema = object({
  nombre:  string().required('El nombre es obligatorio').min(2, 'Mínimo 2 caracteres'),
  email:   string().required('El correo es obligatorio').email('Introduce un correo válido'),
  asunto:  string().required('El asunto es obligatorio'),
  mensaje: string().required('El mensaje es obligatorio').min(10, 'Mínimo 10 caracteres'),
});

const { handleSubmit, resetForm } = useForm({ validationSchema: schema });
const { value: nombre,  errorMessage: nombreError  } = useField('nombre');
const { value: email,   errorMessage: emailError   } = useField('email');
const { value: asunto,  errorMessage: asuntoError  } = useField('asunto');
const { value: mensaje, errorMessage: mensajeError } = useField('mensaje');

const onSubmit = handleSubmit(() => { submitted.value = true; });
const reset    = () => { resetForm(); submitted.value = false; };
</script>

<template>
  <div class="contact-page">

    <!-- ── COLUMNA IZQUIERDA ───────────────────────────────────── -->
    <div class="contact-left">
      <span class="contact-tag">Contacto</span>
      <h1 class="contact-title">Escríbenos</h1>
      <div class="contact-rule"></div>
      <p class="contact-desc">
        ¿Tienes alguna duda sobre el catálogo, un pedido o simplemente quieres
        hablar de cine? Estaremos encantados de responderte.
      </p>

      <div class="contact-info">
        <div class="info-item">
          <span class="info-label">Proyecto</span>
          <span class="info-value">Lost Tapes · 2DAW 2025–2026</span>
        </div>
        <div class="info-item">
          <span class="info-label">Equipo</span>
          <span class="info-value">Manel · Alex · Maxi</span>
        </div>
        <div class="info-item">
          <span class="info-label">Web</span>
          <span class="info-value">projecte12.ddaw.es</span>
        </div>
      </div>

      <blockquote class="contact-quote">
        "Hay películas que no encontrarás en Netflix.<br/>
        Las encontrarás aquí."
      </blockquote>
    </div>

    <!-- ── COLUMNA DERECHA — FORMULARIO ───────────────────────── -->
    <div class="contact-right">
      <div class="film-wrap">
        <div class="film-edge"></div>
        <div class="film-content">
          <h2 class="fw-bold text-center mb-1" style="font-size:clamp(1.2rem,3vw,1.6rem);">Contáctanos</h2>
          <p class="text-center mb-4" style="color:#aaa; font-size:0.85rem;">
            Te responderemos lo antes posible.
          </p>

          <div v-if="submitted" class="text-center py-4">
            <div class="submitted-icon">✓</div>
            <p class="text-success fs-6 mb-4">¡Mensaje enviado correctamente!</p>
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
            <button type="submit" class="btn-send w-100">Enviar mensaje</button>
          </form>
        </div>
        <div class="film-edge"></div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.contact-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #0d0d0d;
}

@media (max-width: 768px) {
  .contact-page { grid-template-columns: 1fr; }
}

/* ── Columna izquierda ─────────────────────────────────────────── */
.contact-left {
  padding: 80px 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid #1e1e1e;
}

@media (max-width: 768px) {
  .contact-left { padding: 56px 24px 32px; border-right: none; border-bottom: 1px solid #1e1e1e; }
}

.contact-tag {
  font-size: 10px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #c0392b;
  font-weight: 600;
  margin-bottom: 16px;
  display: block;
}

.contact-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(40px, 6vw, 72px);
  font-weight: 900;
  color: #fff;
  line-height: 1;
  margin: 0 0 20px;
}

.contact-rule {
  width: 40px;
  height: 2px;
  background: #c0392b;
  margin-bottom: 24px;
}

.contact-desc {
  color: #777;
  font-size: 15px;
  line-height: 1.8;
  margin-bottom: 40px;
  max-width: 360px;
}

/* Info items */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 40px;
}

.info-item { display: flex; flex-direction: column; gap: 2px; }

.info-label {
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #444;
}

.info-value {
  font-size: 14px;
  color: #999;
}

/* Quote */
.contact-quote {
  border-left: 2px solid #c0392b;
  padding-left: 16px;
  margin: 0;
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic;
  font-size: 14px;
  color: #555;
  line-height: 1.7;
}

/* ── Columna derecha ────────────────────────────────────────────── */
.contact-right {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 56px 40px;
  background: #080808;
}

@media (max-width: 768px) {
  .contact-right { padding: 40px 20px 64px; }
}

.contact-right .film-wrap {
  width: 100%;
  max-width: 480px;
}

/* ── Confirmación ─────────────────────────────────────────────── */
.submitted-icon {
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

/* ── Botón enviar ─────────────────────────────────────────────── */
.btn-send {
  background: #c0392b;
  color: #fff;
  border: none;
  padding: 12px;
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
</style>
