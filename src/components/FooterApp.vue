<script setup>
import { ref, onMounted } from 'vue';

const menuOpen = ref(false);
const fontSize = ref(parseInt(localStorage.getItem('tamanoLetra')) || 16);

const changeFont = (delta) => {
  fontSize.value += delta;
  document.body.style.fontSize = fontSize.value + 'px';
  localStorage.setItem('tamanoLetra', fontSize.value);
};

const toggleTheme = () => {
  document.body.classList.toggle('tema-oscuro');
  localStorage.setItem('tema', document.body.classList.contains('tema-oscuro') ? 'oscuro' : 'claro');
};

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
const scrollToDown=()=> window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

onMounted(() => {
  if (localStorage.getItem('tema') === 'oscuro') document.body.classList.add('tema-oscuro');
});
</script>

<template>
  <footer class="footer">
    <div class="footer-contenedor">
      <!-- Sección Logo -->
      <div class="footer-logo">
        <img src="@/assets/img/Logo_Tapes.png" alt="Logo">
        <p>LOST TAPES</p>
      </div>

      <!-- Sección Enlaces -->
      <div class="footer-seccion">
        <h4>Explorar</h4>
        <router-link to="/">Inicio</router-link>
        <router-link to="/productos">Películas</router-link>
        <router-link to="/contacto">Contacto</router-link>
      </div>

      <!-- Sección Soporte -->
      <div class="footer-seccion">
        <h4>Soporte</h4>
        <a href="#">Preguntas Frecuentes</a>
        <a href="#">Términos de Servicio</a>
        <a href="#">Privacidad</a>
      </div>

      <!-- Sección Redes -->
      <div class="footer-seccion">
        <h4>Síguenos</h4>
        <a href="#">Instagram</a>
        <a href="#">Twitter</a>
        <a href="#">Facebook</a>
      </div>
    </div>

    <hr class="footer-line">
    <p class="footer-copy">© 2026 Lost Tapes Project - Películas de Culto</p>

    <!-- Accesibilidad Flotante -->
    <div class="accesibilidad">
      <button @click="menuOpen = !menuOpen" title="Menú de accesibilidad" class="acc-trigger">♿</button>
      <div v-if="menuOpen" id="menuAccesibilidad">
        <button @click="changeFont(1)">Aumentar letra</button>
        <button @click="changeFont(-1)">Reducir letra</button>
        <button @click="toggleTheme">Cambiar Tema</button>
        <button @click="scrollToTop">Subir</button>
        <button @click="scrollToDown">Bajar</button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 60px;
  background: black;
  color: #948d8d;
  padding: 40px 20px;
  font-family: 'Inter', sans-serif;
}

.footer-contenedor {
  max-width: 1200px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
}

.footer-logo img {
  width: 80px;
  margin-bottom: 10px;
}

.footer h4 {
  margin-bottom: 15px;
  color: #ffffff;
  font-size: 18px;
}

.footer a {
  display: block;
  margin-bottom: 8px;
  color: #948d8d;
  text-decoration: none;
  transition: 0.3s;
}

.footer a:hover {
  color: #ff6600;
}

.footer-line {
  margin: 35px auto 20px;
  width: 80%;
  border: none;
  border-top: 1px solid #333;
}

.footer-copy {
  text-align: center;
  font-size: 14px;
  color: #ff6600;
}

.accesibilidad {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 2000;
}

.acc-trigger {
  background: #ff6600;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

#menuAccesibilidad {
  position: absolute;
  bottom: 60px;
  right: 0;
  background: #1a1a1a;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 160px;
}

#menuAccesibilidad button {
  background: #333;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
}

#menuAccesibilidad button:hover {
  background: #444;
}
</style>