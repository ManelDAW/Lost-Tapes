<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useMovieStore } from '@/stores/movieStore';
import { useCartStore } from '@/stores/cartStore';

const router = useRouter();
const movieStore = useMovieStore();
const cartStore = useCartStore();

const menuOpen = ref(false);
const showDropdown = ref(false);

const user = computed(() => movieStore.user);
const isAdminOrVendedor = computed(() => user.value?.role === 'admin' || user.value?.role === 'vendedor');

const closeMenu = () => { menuOpen.value = false; };

const logout = () => {
  movieStore.logout();
  showDropdown.value = false;
  closeMenu();
  router.push('/');
};

const closeOnOutsideClick = (e) => {
  if (!e.target.closest('.lt-nav')) {
    menuOpen.value = false;
    showDropdown.value = false;
  } else if (!e.target.closest('.user-menu-wrap')) {
    showDropdown.value = false;
  }
};

onMounted(() => document.addEventListener('click', closeOnOutsideClick));
onUnmounted(() => document.removeEventListener('click', closeOnOutsideClick));
</script>

<template>
  <nav class="lt-nav">
    <div class="lt-nav__inner">

      <!-- Logo -->
      <router-link class="lt-nav__logo" to="/" @click="closeMenu">
        <img src="@/assets/img/Logo_Tapes.png" alt="Lost Tapes" height="40"
             style="background:white; padding:2px; display:block;" />
      </router-link>

      <!-- Desktop: links centrados -->
      <ul class="lt-nav__links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/nosotros">Nosotros</router-link></li>
        <li><router-link to="/contacto">Contacto</router-link></li>
        <li><router-link to="/productos">Productos</router-link></li>
        <li v-if="isAdminOrVendedor"><router-link to="/vender">Vender</router-link></li>
      </ul>

      <!-- Derecha: carrito + sesión + hamburger -->
      <div class="lt-nav__right">

        <!-- Carrito -->
        <button class="lt-nav__cart" @click="cartStore.open = true; closeMenu()">
          🛒
          <span v-if="cartStore.totalItems > 0" class="lt-nav__badge">
            {{ cartStore.totalItems }}
          </span>
        </button>

        <!-- Sesión (desktop) -->
        <router-link v-if="!user" to="/login" class="lt-nav__btn d-none d-lg-inline-flex" @click="closeMenu">
          Iniciar sesión
        </router-link>

        <div v-else class="user-menu-wrap d-none d-lg-block" style="position:relative;">
          <button class="lt-nav__btn" @click="showDropdown = !showDropdown">
            {{ user.name }} ▾
          </button>
          <ul v-if="showDropdown" class="lt-dropdown">
            <li>
              <router-link to="/perfil" @click="showDropdown = false">Mi perfil</router-link>
            </li>
            <li v-if="isAdminOrVendedor">
              <router-link to="/admin/productos" @click="showDropdown = false">Gestionar productos</router-link>
            </li>
            <li class="lt-dropdown__divider"></li>
            <li>
              <a href="#" @click.prevent="logout">Cerrar sesión</a>
            </li>
          </ul>
        </div>

        <!-- Hamburger (mobile) -->
        <button class="lt-hamburger d-lg-none" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen">
          <span :class="{ open: menuOpen }"></span>
          <span :class="{ open: menuOpen }"></span>
          <span :class="{ open: menuOpen }"></span>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div class="lt-mobile-menu" :class="{ 'lt-mobile-menu--open': menuOpen }">
      <ul>
        <li><router-link to="/" @click="closeMenu">Home</router-link></li>
        <li><router-link to="/nosotros" @click="closeMenu">Nosotros</router-link></li>
        <li><router-link to="/contacto" @click="closeMenu">Contacto</router-link></li>
        <li><router-link to="/productos" @click="closeMenu">Productos</router-link></li>
        <li v-if="isAdminOrVendedor">
          <router-link to="/vender" @click="closeMenu">Vender</router-link>
        </li>
      </ul>

      <div class="lt-mobile-menu__footer">
        <template v-if="!user">
          <router-link to="/login" class="lt-mobile-menu__btn" @click="closeMenu">
            Iniciar sesión
          </router-link>
        </template>
        <template v-else>
          <router-link to="/perfil" class="lt-mobile-menu__user-link" @click="closeMenu">
            👤 {{ user.name }}
          </router-link>
          <router-link v-if="isAdminOrVendedor" to="/admin/productos" class="lt-mobile-menu__user-link" @click="closeMenu">
            ⚙️ Gestionar productos
          </router-link>
          <button class="lt-mobile-menu__logout" @click="logout">Cerrar sesión</button>
        </template>
      </div>
    </div>

  </nav>
</template>

<style scoped>
.lt-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1030;
  background: #111;
  border-bottom: 1px solid #2a2a2a;
}

.lt-nav__inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.lt-nav__logo { flex-shrink: 0; }

/* Desktop links */
.lt-nav__links {
  display: none;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 8px;
}

@media (min-width: 992px) {
  .lt-nav__links {
    display: flex;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}

.lt-nav__links a {
  display: block;
  padding: 6px 14px;
  color: #ccc;
  text-decoration: none;
  font-size: 0.9rem;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
}

.lt-nav__links a:hover,
.lt-nav__links a.router-link-active {
  color: #fff;
  background: #222;
}

.lt-nav__links a.router-link-exact-active {
  color: var(--accent);
}

/* Right side */
.lt-nav__right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.lt-nav__cart {
  background: none;
  border: 1px solid #444;
  color: #fff;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  transition: border-color 0.2s;
}
.lt-nav__cart:hover { border-color: var(--accent); }

.lt-nav__badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: var(--accent);
  color: #fff;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.65rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lt-nav__btn {
  background: none;
  border: 1px solid #555;
  color: #ddd;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
}
.lt-nav__btn:hover { border-color: var(--accent); color: #fff; }

/* Desktop dropdown */
.lt-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #1e1e1e;
  border: 1px solid #333;
  border-radius: 10px;
  list-style: none;
  padding: 6px;
  min-width: 190px;
  z-index: 9999;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}

.lt-dropdown a {
  display: block;
  padding: 9px 14px;
  color: #ccc;
  text-decoration: none;
  font-size: 0.88rem;
  border-radius: 6px;
  transition: background 0.15s, color 0.15s;
}
.lt-dropdown a:hover { background: #2a2a2a; color: #fff; }

.lt-dropdown__divider {
  height: 1px;
  background: #333;
  margin: 4px 0;
}

/* Hamburger button */
.lt-hamburger {
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 6px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.lt-hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: #fff;
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform-origin: center;
}

.lt-hamburger span:nth-child(1).open { transform: translateY(7px) rotate(45deg); }
.lt-hamburger span:nth-child(2).open { opacity: 0; transform: scaleX(0); }
.lt-hamburger span:nth-child(3).open { transform: translateY(-7px) rotate(-45deg); }

/* Mobile menu */
.lt-mobile-menu {
  background: #111;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease, padding 0.35s ease;
}

.lt-mobile-menu--open {
  max-height: 500px;
  border-top: 1px solid #2a2a2a;
}

.lt-mobile-menu ul {
  list-style: none;
  margin: 0;
  padding: 12px 20px 0;
}

.lt-mobile-menu ul a {
  display: block;
  padding: 14px 0;
  color: #ccc;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  border-bottom: 1px solid #1e1e1e;
  transition: color 0.2s;
}

.lt-mobile-menu ul a:hover,
.lt-mobile-menu ul a.router-link-exact-active {
  color: var(--accent);
}

.lt-mobile-menu__footer {
  padding: 16px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.lt-mobile-menu__btn {
  display: block;
  text-align: center;
  padding: 12px;
  background: var(--accent);
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
}

.lt-mobile-menu__user-link {
  display: block;
  padding: 10px 0;
  color: #bbb;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}
.lt-mobile-menu__user-link:hover { color: #fff; }

.lt-mobile-menu__logout {
  background: none;
  border: 1px solid #444;
  color: #888;
  padding: 10px;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}
.lt-mobile-menu__logout:hover { border-color: #e53935; color: #e53935; }

</style>
