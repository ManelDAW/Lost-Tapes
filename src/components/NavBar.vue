<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMovieStore } from '@/stores/movieStore';
import { Collapse } from 'bootstrap';

const router = useRouter();
const movieStore = useMovieStore();
const showDropdown = ref(false);

const user = computed(() => movieStore.user);
const isAdminOrVendedor = computed(() => user.value?.role === 'admin' || user.value?.role === 'vendedor');

const searchQuery = ref('');

const closeNavbar = () => {
  const el = document.getElementById('navbarNav');
  if (el) {
    const instance = Collapse.getInstance(el);
    if (instance) instance.hide();
  }
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/productos', query: { q: searchQuery.value.trim() } });
    searchQuery.value = '';
    closeNavbar();
  }
};

const logout = () => {
  movieStore.logout();
  showDropdown.value = false;
  closeNavbar();
  router.push('/');
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style="background-color:#1a1a1a; border-bottom:1px solid #333;">
    <div class="container-xl">

      <!-- Logo -->
      <router-link class="navbar-brand p-0" to="/" @click="closeNavbar">
        <img src="@/assets/img/Logo_Tapes.png" alt="Lost Tapes" height="44"
             style="background:white; padding:2px;" />
      </router-link>

      <!-- Hamburger -->
      <button class="navbar-toggler border-secondary" type="button"
              data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Contenido colapsable -->
      <div class="collapse navbar-collapse" id="navbarNav">

        <!-- Links centrados -->
        <ul class="navbar-nav mx-auto gap-lg-2">
          <li class="nav-item">
            <router-link class="nav-link" to="/" @click="closeNavbar">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/nosotros" @click="closeNavbar">Nosotros</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contacto" @click="closeNavbar">Contacto</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/productos" @click="closeNavbar">Productos</router-link>
          </li>
          <li v-if="isAdminOrVendedor" class="nav-item">
            <router-link class="nav-link" to="/vender" @click="closeNavbar">Vender</router-link>
          </li>
        </ul>

        <!-- Búsqueda + sesión -->
        <div class="d-flex align-items-center gap-2 mt-2 mt-lg-0">
          <form class="d-flex gap-1" @submit.prevent="handleSearch">
            <input v-model="searchQuery" type="text" placeholder="Buscar..."
                   class="form-control form-control-sm"
                   style="width:150px; background:#222; border-color:#444; color:white;" />
            <button type="submit" class="btn btn-sm btn-outline-secondary">🔍</button>
          </form>

          <router-link v-if="!user" to="/login" class="btn btn-sm btn-outline-light ms-1" @click="closeNavbar">
            Iniciar sesión
          </router-link>

          <div v-else class="dropdown">
            <button class="btn btn-sm btn-outline-light dropdown-toggle"
                    data-bs-toggle="dropdown" aria-expanded="false">
              {{ user.name }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end" style="background:#222; border-color:#444;">
              <li>
                <router-link class="dropdown-item text-white" to="/perfil" @click="closeNavbar">
                  Mi perfil
                </router-link>
              </li>
              <li v-if="isAdminOrVendedor">
                <router-link class="dropdown-item text-white" to="/admin/productos" @click="closeNavbar">
                  Gestionar productos
                </router-link>
              </li>
              <li><hr class="dropdown-divider border-secondary" /></li>
              <li>
                <a class="dropdown-item text-white" href="#" @click.prevent="logout">
                  Cerrar sesión
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </nav>
</template>
