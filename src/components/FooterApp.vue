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

onMounted(() => {
  if (localStorage.getItem('tema') === 'oscuro') document.body.classList.add('tema-oscuro');
});
</script>

<template>
  <footer class="lt-footer">
    <div class="lt-footer__inner">

      <!-- Logo + tagline -->
      <div class="lt-footer__brand">
        <img src="@/assets/img/Logo_Tapes.png" alt="Lost Tapes" class="lt-footer__logo" />
        <p class="lt-footer__tagline">
          Recuperamos lo que<br/>el tiempo enterró
        </p>
      </div>

      <!-- Explorar -->
      <div class="lt-footer__col">
        <h5 class="lt-footer__heading">Explorar</h5>
        <nav class="lt-footer__nav">
          <router-link to="/">Inicio</router-link>
          <router-link to="/productos">Películas</router-link>
          <router-link to="/nosotros">Sobre nosotros</router-link>
          <router-link to="/contacto">Contacto</router-link>
        </nav>
      </div>

      <!-- Info -->
      <div class="lt-footer__col">
        <h5 class="lt-footer__heading">Info</h5>
        <nav class="lt-footer__nav">
          <a href="#">Términos de servicio</a>
          <a href="#">Política de privacidad</a>
          <a href="https://api.projecte12.ddaw.es/api/documentation" target="_blank">API Docs</a>
        </nav>
      </div>

    </div>

    <div class="lt-footer__bottom">
      <span class="lt-footer__copy">© 2026 Lost Tapes · Tienda de cine de culto</span>
      <button class="lt-footer__top" @click="scrollToTop" title="Volver arriba">↑</button>
    </div>

    <!-- Accesibilidad flotante -->
    <div class="accesibilidad">
      <button @click="menuOpen = !menuOpen" title="Menú de accesibilidad" class="acc-trigger">♿</button>
      <div v-if="menuOpen" class="acc-menu">
        <button @click="changeFont(1)">A+ Aumentar letra</button>
        <button @click="changeFont(-1)">A− Reducir letra</button>
        <button @click="toggleTheme">◑ Cambiar tema</button>
        <button @click="scrollToTop">↑ Subir</button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.lt-footer {
  background: #0a0a0a;
  border-top: 1px solid #1e1e1e;
  padding: 64px 24px 0;
  font-family: 'Inter', sans-serif;
}

.lt-footer__inner {
  max-width: 1320px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 48px;
  padding-bottom: 48px;
}

@media (max-width: 900px) {
  .lt-footer__inner { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 540px) {
  .lt-footer__inner { grid-template-columns: 1fr; }
}

/* Brand */
.lt-footer__logo {
  width: 90px;
  background: white;
  padding: 3px;
  display: block;
  margin-bottom: 16px;
}

.lt-footer__tagline {
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic;
  font-size: 15px;
  color: #555;
  line-height: 1.6;
  margin: 0 0 10px;
}

/* Columnas */
.lt-footer__heading {
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #c0392b;
  font-weight: 600;
  margin: 0 0 16px;
}

.lt-footer__nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.lt-footer__nav a,
.lt-footer__nav span {
  color: #555;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.lt-footer__nav a:hover { color: #e2e2e2; }

/* Bottom bar */
.lt-footer__bottom {
  max-width: 1320px;
  margin: 0 auto;
  padding: 20px 0;
  border-top: 1px solid #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.lt-footer__copy {
  font-size: 12px;
  color: #333;
  letter-spacing: 1px;
}

.lt-footer__top {
  background: none;
  border: 1px solid #2a2a2a;
  color: #444;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  transition: border-color 0.2s, color 0.2s;
}

.lt-footer__top:hover {
  border-color: #c0392b;
  color: #c0392b;
}

/* Accesibilidad */
.accesibilidad {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 2000;
}

.acc-trigger {
  background: #c0392b;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  color: white;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(192,57,43,0.4);
  transition: background 0.2s;
}

.acc-trigger:hover { background: #a93226; }

.acc-menu {
  position: absolute;
  bottom: 58px;
  right: 0;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 180px;
}

.acc-menu button {
  background: #222;
  color: #ccc;
  border: none;
  padding: 9px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  text-align: left;
  transition: background 0.15s, color 0.15s;
}

.acc-menu button:hover {
  background: #2a2a2a;
  color: #fff;
}
</style>
