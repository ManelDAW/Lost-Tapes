<script setup>
import { ref } from 'vue';

const nombre = ref('');
const email = ref('');
const asunto = ref('');
const mensaje = ref('');
const checkboxValidar = ref(false);

const handleSubmit = () => {
  // --- MODO JAVASCRIPT ---
  if (checkboxValidar.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nombre.value.trim() === '') {
      alert('¡Error de JS!: Por favor, ingresa tu nombre completo.');
      return;
    }
    if (!emailRegex.test(email.value.trim())) {
      alert('¡Error de JS!: Por favor, ingresa un correo electrónico válido.');
      return;
    }
    if (asunto.value.trim() === '') {
      alert('¡Error de JS!: Por favor, ingresa el asunto.');
      return;
    }
    if (mensaje.value.trim() === '') {
      alert('¡Error de JS!: Por favor, escribe tu mensaje.');
      return;
    }

    alert('Validación de JavaScript superada con éxito.');
  }

  // --- MODO HTML (implícito) ---
  // Si el checkbox no está marcado, Vue no entra en el 'if' anterior.
  // Como el formulario tiene los atributos 'required', el navegador 
  // se encarga de mostrar sus propios globos de error.

  console.log("Formulario procesado correctamente.");
};
</script>

<template>
  <section class="contact-section">
    <div class="film-container">
      <div class="film-edge left"></div>

      <div class="form-content">
        <h1>Contáctanos</h1>
        <p class="subtitle">Envíanos un mensaje y te responderemos lo antes posible.</p>

        <!-- CRITICAL: :novalidate="checkboxValidar" 
             Si el checkbox está marcado, desactivamos la validación nativa de HTML 
             para que tus alert() de JS puedan salir primero. -->
        <form @submit.prevent="handleSubmit" :novalidate="checkboxValidar" class="styled-form">
          <div class="form-group">
            <label for="nombre">Nombre completo:</label>
            <input v-model="nombre" type="text" id="nombre" placeholder="Tu nombre" required>
          </div>

          <div class="form-group">
            <label for="email">Correo electrónico:</label>
            <input v-model="email" type="email" id="email" placeholder="tu@correo.com" required>
          </div>

          <div class="form-group">
            <label for="asunto">Asunto:</label>
            <input v-model="asunto" type="text" id="asunto" placeholder="Motivo del mensaje" required>
          </div>

          <div class="form-group">
            <label for="mensaje">Mensaje:</label>
            <textarea v-model="mensaje" id="mensaje" rows="4" placeholder="Escribe tu mensaje aquí..."
              required></textarea>
          </div>

          <div class="form-group checkbox-group">
            <input type="checkbox" id="btn-validar" v-model="checkboxValidar">
            <label for="btn-validar">Validar con JS</label>
          </div>

          <button type="submit" class="submit-btn">Enviar Mensaje</button>
        </form>
      </div>

      <div class="film-edge right"></div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
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
  max-width: 600px;
  width: 100%;
}

.film-edge {
  width: 40px;
  background-color: #111;
  position: relative;
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
  font-size: 2.2rem;
  text-align: center;
  margin-bottom: 10px;
}

.subtitle {
  color: #aaa;
  text-align: center;
  margin-bottom: 30px;
  font-size: 0.9rem;
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

input,
textarea {
  width: 100%;
  padding: 12px;
  background-color: #000;
  border: 1px solid #444;
  color: white;
  border-radius: 4px;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 10px;
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
  margin-top: 10px;
}

.checkbox-group {
  display: flex;         
  align-items: center;   
  gap: 8px;              
  margin-top: 15px;     
  margin-bottom: 20px;
}

.checkbox-group label {
  display: inline;       
  margin: 0;            
  padding: 0;            
  font-size: 0.9rem;
  color: white;
  cursor: pointer;
  width: auto;           
}

.checkbox-group input[type="checkbox"] {
  width: 16px;          
  height: 16px;
  margin: 0;            
  cursor: pointer;
}
</style>