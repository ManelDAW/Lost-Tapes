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
        </form>
      </div>
      <div class="film-edge"></div>
    </div>
  </div>
</template>
