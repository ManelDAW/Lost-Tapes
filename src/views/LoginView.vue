<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMovieStore } from '@/stores/movieStore';

const router = useRouter();
const movieStore = useMovieStore();

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const handleLogin = async () => {
  error.value = '';
  loading.value = true;
  const result = await movieStore.loginUser(email.value, password.value);
  loading.value = false;
  if (!result.ok) { error.value = result.message; return; }
  router.push('/');
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center py-5" style="min-height:100vh;">
    <div class="film-wrap" style="max-width:480px;">
      <div class="film-edge"></div>
      <div class="film-content text-center">
        <img src="@/assets/img/Logo_Tapes.png" alt="Logo" height="60"
             style="background:white; padding:4px; margin-bottom:20px;" />
        <h1 class="fw-bold mb-1" style="font-size:2rem;">Iniciar sesión</h1>
        <p class="mb-4" style="color:#aaa; font-size:0.9rem;">Accede a tu cuenta de Lost Tapes</p>

        <form @submit.prevent="handleLogin" class="text-start">
          <div class="mb-3">
            <label for="email" class="form-label fw-bold text-white">Correo electrónico</label>
            <input v-model="email" type="email" id="email" placeholder="tu@correo.com"
                   class="form-control" style="background:#000; border-color:#444; color:white;" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label fw-bold text-white">Contraseña</label>
            <input v-model="password" type="password" id="password" placeholder="••••••••"
                   class="form-control" style="background:#000; border-color:#444; color:white;" required />
          </div>

          <div v-if="error" class="alert alert-danger py-2 small">{{ error }}</div>

          <button type="submit" class="btn btn-light w-100 fw-bold text-uppercase mt-1" :disabled="loading">
            {{ loading ? 'Cargando...' : 'Entrar' }}
          </button>
        </form>

        <p class="mt-4" style="font-size:0.8rem; color:#666;">
          Prueba: <code style="color:#ff6600;">admin@losttapes.com</code> / <code style="color:#ff6600;">1234</code>
        </p>
      </div>
      <div class="film-edge"></div>
    </div>
  </div>
</template>
