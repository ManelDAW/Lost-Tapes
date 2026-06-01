<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMovieStore } from '@/stores/movieStore';
import { useCartStore } from '@/stores/cartStore';
import { Collapse } from 'bootstrap';

const router = useRouter();
const movieStore = useMovieStore();
const cartStore = useCartStore();
const showDropdown = ref(false);

const user = computed(() => movieStore.user);
const isAdminOrVendedor = computed(() => user.value?.role === 'admin' || user.value?.role === 'vendedor');

const closeNavbar = () => {
  const el = document.getElementById('navbarNav');
  if (el) {
    const instance = Collapse.getInstance(el);
    if (instance) instance.hide();
  }
};

const logout = () => {
  movieStore.logout();
  showDropdown.value = false;
  closeNavbar();
  router.push('/');
};

const closeDropdownOnOutsideClick = (e) => {
  if (!e.target.closest('.position-relative')) showDropdown.value = false;
};

onMounted(() => document.addEventListener('click', closeDropdownOnOutsideClick));
onUnmounted(() => document.removeEventListener('click', closeDropdownOnOutsideClick));
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
        <div class="nav-inner w-100 d-lg-flex align-items-center">

          <!-- Espaciador izquierdo (desktop): empuja el menú al centro real -->
          <div class="flex-fill d-none d-lg-block"></div>

          <!-- Links centrados -->
          <ul class="navbar-nav gap-lg-3">
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

          <!-- Derecha: carrito + sesión -->
          <div class="flex-fill d-flex align-items-center gap-2 mt-3 mt-lg-0 justify-content-lg-end">

            <!-- Carrito -->
            <button class="btn btn-sm btn-outline-light position-relative"
                    @click="cartStore.open = true; closeNavbar()">
              🛒
              <span v-if="cartStore.totalItems > 0"
                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                    style="background:var(--accent); font-size:0.65rem;">
                {{ cartStore.totalItems }}
              </span>
            </button>

            <router-link v-if="!user" to="/login" class="btn btn-sm btn-outline-light" @click="closeNavbar">
              Iniciar sesión
            </router-link>

            <div v-else class="position-relative">
              <button class="btn btn-sm btn-outline-light"
                      @click="showDropdown = !showDropdown">
                {{ user.name }} ▾
              </button>
              <ul v-if="showDropdown"
                  class="position-absolute end-0 mt-1 py-1 rounded list-unstyled"
                  style="background:#222; border:1px solid #444; min-width:180px; z-index:9999; overflow:hidden;">
                <li>
                  <router-link to="/perfil" @click="showDropdown = false; closeNavbar()"
                               style="display:block; padding:8px 16px; color:white; text-decoration:none; font-size:0.9rem;"
                               onmouseover="this.style.background='#333'" onmouseout="this.style.background='transparent'">
                    Mi perfil
                  </router-link>
                </li>
                <li v-if="isAdminOrVendedor">
                  <router-link to="/admin/productos" @click="showDropdown = false; closeNavbar()"
                               style="display:block; padding:8px 16px; color:white; text-decoration:none; font-size:0.9rem;"
                               onmouseover="this.style.background='#333'" onmouseout="this.style.background='transparent'">
                    Gestionar productos
                  </router-link>
                </li>
                <li><hr class="my-1" style="border-color:#444;" /></li>
                <li>
                  <a href="#" @click.prevent="logout"
                     style="display:block; padding:8px 16px; color:white; text-decoration:none; font-size:0.9rem;"
                     onmouseover="this.style.background='#333'" onmouseout="this.style.background='transparent'">
                    Cerrar sesión
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  </nav>
</template>
