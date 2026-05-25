<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMovieStore } from '@/stores/movieStore';
import { computed } from 'vue';

const router = useRouter();
const movieStore = useMovieStore();
const showDropdown = ref(false);

const user = computed(() => movieStore.user);
const isAdminOrVendedor = computed(() => user.value?.role === 'admin' || user.value?.role === 'vendedor');

const logout = () => {
  movieStore.logout();
  showDropdown.value = false;
  router.push('/');
};
</script>

<template>
  <header class="header">
    <div class="nav-container">
      <!-- 1. Logo (Izquierda) -->
      <div class="nav-left">
        <router-link class="navbar-brand" to="/">
          <img src="@/assets/img/Logo_Tapes.png" alt="Logo" class="logo-img">
        </router-link>
      </div>

      <!-- 2. Menú de Navegación (Centro) -->
      <nav class="nav-center">
        <ul class="nav-list">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/contacto">Contacto</router-link></li>
          <li><router-link to="/productos">Productos</router-link></li>
          <li><router-link to="/vender">Sell</router-link></li>
        </ul>
      </nav>

      <!-- 3. Sesión / Botón (Derecha) -->
      <div class="nav-right">
        <div class="session">
          <router-link v-if="!user" to="/login" class="session-btn">Iniciar sesión</router-link>
          <div v-else class="dropdown">
            <button class="session-btn" @click="showDropdown = !showDropdown">
              {{ user.name }}
            </button>
            <div v-if="showDropdown" class="session-dropdown">
              <router-link to="/perfil">Mi perfil</router-link>
              <router-link v-if="isAdminOrVendedor" to="/admin/productos">Gestionar productos</router-link>
              <a href="#" @click.prevent="logout">Cerrar sesión</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  background-color: #1a1a1a;
  padding: 10px 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  border-bottom: 1px solid #333;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* Distribuye las 3 secciones */
  padding: 0 20px;
}

/* Sección Izquierda */
.nav-left {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.logo-img {
  width: 50px;
  height: auto;
  display: block;
  background: white;
  /* Para que resalte como en la imagen original */
  padding: 2px;
}

/* Sección Central (Horizontal y Centrada) */
.nav-center {
  flex: 2;
}

.nav-list {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 0;
  padding: 0;
}

.nav-list a {
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-list a:hover {
  color: #ff6600;
}

/* Sección Derecha */
.nav-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.session-btn {
  background: none;
  border: 1px solid white;
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.session-btn:hover {
  background: white;
  color: black;
}

.session-dropdown {
  position: absolute;
  top: 45px;
  right: 20px;
  background: #222;
  border: 1px solid #444;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 4px;
}

.session-dropdown a {
  color: white;
  text-decoration: none;
  font-size: 14px;
}
</style>