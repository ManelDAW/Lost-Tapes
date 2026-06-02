<script setup>
import { useForm, useField } from 'vee-validate';
import { object, string } from 'yup';
import { useRouter } from 'vue-router';
import { useMovieStore } from '@/stores/movieStore';
import { ref } from 'vue';

const router = useRouter();
const movieStore = useMovieStore();
const serverError = ref('');
const loading = ref(false);

const schema = object({
  email: string().required('El correo es obligatorio').email('Introduce un correo válido'),
  password: string().required('La contraseña es obligatoria').min(4, 'Mínimo 4 caracteres'),
});

const apiUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8000';
const { handleSubmit } = useForm({ validationSchema: schema });
const { value: email, errorMessage: emailError } = useField('email');
const { value: password, errorMessage: passwordError } = useField('password');

const onSubmit = handleSubmit(async (values) => {
  serverError.value = '';
  loading.value = true;
  const result = await movieStore.loginUser(values.email, values.password);
  loading.value = false;
  if (!result.ok) { serverError.value = result.message; return; }
  router.push('/');
});
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

        <form @submit.prevent="onSubmit" class="text-start" novalidate>
          <div class="mb-3">
            <label for="email" class="form-label fw-bold text-white">Correo electrónico</label>
            <input v-model="email" type="email" id="email" placeholder="tu@correo.com"
                   class="form-control" :class="{ 'is-invalid': emailError }"
                   style="background:#000; border-color:#444; color:white;" />
            <div v-if="emailError" class="invalid-feedback">{{ emailError }}</div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label fw-bold text-white">Contraseña</label>
            <input v-model="password" type="password" id="password" placeholder="••••••••"
                   class="form-control" :class="{ 'is-invalid': passwordError }"
                   style="background:#000; border-color:#444; color:white;" />
            <div v-if="passwordError" class="invalid-feedback">{{ passwordError }}</div>
          </div>

          <div v-if="serverError" class="alert alert-danger py-2 small">{{ serverError }}</div>

          <button type="submit" class="btn btn-light w-100 fw-bold text-uppercase mt-1" :disabled="loading">
            {{ loading ? 'Cargando...' : 'Entrar' }}
          </button>

          <div class="d-flex align-items-center gap-2 my-3">
            <hr class="flex-grow-1" style="border-color:#444;" />
            <span style="color:#666; font-size:0.8rem;">o</span>
            <hr class="flex-grow-1" style="border-color:#444;" />
          </div>

          <a :href="`${apiUrl}/auth/google`"
             class="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2">
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            Continuar con Google
          </a>
        </form>
      </div>
      <div class="film-edge"></div>
    </div>
  </div>
</template>
