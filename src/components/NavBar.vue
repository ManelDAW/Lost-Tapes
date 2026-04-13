<template>
  <header class="header">
    <div class="container-fluid d-flex align-items-center navbar navbar-expand-md navbar-dark" style="position:relative;">
      <router-link class="navbar-brand" to="/">
        <img src="/img/Logo_Tapes.png" alt="Logo" style="width:70px;">
      </router-link>

      <button class="navbar-toggler d-md-none ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <nav class="collapse navbar-collapse justify-content-center" id="mainNav">
        <ul class="navbar-nav">
          <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/contacto">Contacto</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/productos">Productos</router-link></li>
          <li class="nav-item"><router-link class="nav-link" to="/vender">Sell</router-link></li>
        </ul>
      </nav>

      <div class="d-flex align-items-center ms-auto">
        <div class="position-relative me-2">
          <button class="btn btn-outline-light btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#headerSearchPanel" aria-expanded="false" title="Buscar">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85zm-5.242 1.656a5 5 0 1 1 0-10 5 5 0 0 1 0 10z"/>
            </svg>
          </button>
          <div class="collapse header-search-panel p-2 bg-dark rounded" id="headerSearchPanel" style="position: absolute; right: 0; z-index: 1000; min-width: 200px;">
            <form @submit.prevent="handleSearch" class="d-flex">
              <input v-model="searchQuery" class="form-control form-control-sm" type="search" placeholder="Buscar productos..." aria-label="Buscar">
              <button class="btn btn-sm btn-primary ms-2" type="submit">Ir</button>
            </form>
          </div>
        </div>

        <div v-if="!user" class="ms-3">
          <router-link class="btn btn-outline-light btn-sm" to="/login">Iniciar sesión</router-link>
        </div>
        <div v-else class="dropdown ms-3">
          <a class="btn btn-outline-light btn-sm dropdown-toggle" href="#" role="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            {{ user.nom_usuari || user.nom || 'Cuenta' }}
          </a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li><router-link class="dropdown-item" to="/perfil">Mi perfil</router-link></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" @click.prevent="logout">Cerrar sesión</a></li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');

// Simulación de usuario (Más adelante lo conectarás con Pinia)
const user = ref(null); 

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'productos', query: { q: searchQuery.value } });
  }
};

const logout = () => {
  user.value = null;
  router.push('/');
};
</script>

<style scoped>
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  color: #ffffff;
  z-index: 1000;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.header a {
  color: #ffffff;
  text-decoration: none;
  margin: 0 0.5rem;
}

.header a:hover {
  color: #ff6600;
}

.header-search-panel {
  top: 100%;
}

/* Session / User Dropdown styles */
.session { position: relative; margin-left: 8px; display: inline-flex; align-items: center; }
.session-btn {
  background: #ffffff;
  color: #111;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 700;
}
</style>